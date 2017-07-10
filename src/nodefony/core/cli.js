const Table = require('cli-table');
const asciify = require('asciify');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const simpleGit = require('simple-git');
const inquirer = require('inquirer');

module.exports = nodefony.register( "cli", function(){

  const red   = clc.red.bold;
	const cyan   = clc.cyan.bold;
	const blue  = clc.blueBright.bold;
	const green = clc.green;
	const yellow = clc.yellow.bold;
	const reset = '\x1b[0m';

	var logSeverity = function(severity) {
		switch(severity){
			case "DEBUG":
				return cyan(severity);
			case "INFO":
				return blue(severity);
			case "NOTICE" :
				return red(severity)    ;
			case "WARNING" :
				return yellow(severity);
			case "ERROR" :
			case "CRITIC":
			case "ALERT":
			case "EMERGENCY":
				return red(severity);
			default:
				return cyan(severity);
		}
	};

  const regHidden = /^\./;
	const isHiddenFile = function(name){
		return regHidden.test(name);
	};

  const defaultTableCli = {
  		style: {head: ['cyan'], border: ['grey']}
  };

  const defaultOptions = {
    asciify : true
  };

  const CLI = class CLI extends nodefony.Service {

  	constructor (name, container, notificationsCenter, options ){
      options = nodefony.extend(defaultOptions, options);
  		super( name, container, notificationsCenter, options);
      this.wrapperLog = console.log ;
      this.inquirer =inquirer ;
   		this.initUi();
      if ( name  && this.options.asciify ){
        this.asciify("      "+name , {
          font: this.options.font || "standard"
        },(err, data) =>{
          console.log( blue(data) );
        });
      }
  	}

    getFonts(){
      asciify.getFonts( (err, fonts) => {
        fonts.forEach( this.logger  );
      });
    }

    listenSyslog(options){
        let defaultOption = {
            severity: {
                operator:"<=",
                data : "7"
            }
        }
        return this.syslog.listenWithConditions(this, options || defaultOption , (pdu) => {
          return this.normalizeLog(pdu) ;
        });
    }

    asciify (txt, options , callback) {
      return asciify(txt, nodefony.extend({
        font:'standard'
      }, options) , callback) ;
    }

  	initUi () {
  		this.clc = clc ;
  		this.clui = require("clui");
  		this.emoji = require("node-emoji");
          this.spinner = null ;
  		this.blankLine =  function(){
  				var myLine = new this.clui.Line().fill() ;
  				return () =>{
  					myLine.output();
  				}
  		}.call(this)
  	}

    createProgress (size){
        return new this.clui.Progress(size)
    }

    createSparkline (values, suffix){
        if ( values ){
            try {
                return this.clui.Sparkline(values, suffix || "");
            }catch(e){
                    this.logger(e, "ERROR");
                    throw e ;
            }
        }
    }

    getSpinner (message, design){
        var countdown = new this.clui.Spinner(message, design || null );
        return countdown ;
    }

    startSpinner (message, design){
        this.spinner = new this.clui.Spinner(message, design || null );
        this.wrapperLog = this.spinner.message ;
        this.spinner.start();
        return this.spinner ;
    }
    stopSpinner (message, options){
        this.spinner.stop();
        this.wrapperLog = console.log ;
        delete this.spinner ;
    }

    getSimpleGit(gitPath){
        if ( gitPath ){
            return simpleGit( gitPath );
        }
        return simpleGit ;
    }

    setGitPath (gitPath){
        this.git = this.getSimpleGit( gitPath );
        return this.git ;
    }

    normalizeLog  (pdu){
    	let date = new Date(pdu.timeStamp) ;
    	if (  pdu.payload === "" || pdu.payload === undefined ){
    		console.log( date.toDateString() + " " + date.toLocaleTimeString() + " " + logSeverity( pdu.severityName ) + " " + green( pdu.msgid) + " " + " : " + "logger message empty !!!!");
    		console.trace(pdu);
    		return 	;
    	}
    	let message = pdu.payload;
    	switch( typeof message ){
    		case "object" :
    			switch (true){
    				default:
    					message = util.inspect(message)
    			}
    		break;
    		default:
    	}
      if ( ! this.wrapperLog ){
        this.wrapperLog = console.log ;
      }
    	return this.wrapperLog( date.toDateString() + " " + date.toLocaleTimeString() + " " + logSeverity( pdu.severityName ) + " " + green(pdu.msgid) + " " + " : " + message);
	  }

    getSizeDirectory (dir, exclude){
  		try {
  			if ( exclude ){
  				var basename = path.basename(dir);
  				if ( basename.match(exclude) ){
  					return 0 ;
  				}
  			}
  			var stat = fs.lstatSync(dir);
  		}catch(e){
  			this.logger(e, "WARNING");
  			return 0 ;
  		}
  		var files = null ;
  		switch (true){
  			case stat.isFile() :
  				throw  new Error ( dir+" is not a directory");
  			break;
  			case stat.isDirectory() :
  				files = fs.readdirSync(dir);
  			break;
  			case stat.isSymbolicLink() :
  				files = fs.realpathSync(dir);
  			break;
  			default:
  				throw  new Error ( dir+" is not a directory");
  		}

  		var i, totalSizeBytes= 0;
  		var dirSize = null ;
  		for (i=0; i<files.length; i++) {
  			var Path = dir+"/"+files[i] ;
  			try {
  				stat = fs.lstatSync(Path);
  			}catch(e){
  				return 	totalSizeBytes ;
  			}
  			switch (true){
  				case stat.isFile() :
  					if (!  isHiddenFile(files[i] ) ){
  						totalSizeBytes += stat.size;
  					}
  				break;
  				case stat.isDirectory() :
  					dirSize = this.getSizeDirectory(Path, exclude);
  					totalSizeBytes += dirSize;
  				break;
  				case stat.isSymbolicLink() :
  					//console.log("isSymbolicLink")
  					dirSize = this.getSizeDirectory(fs.realpathSync(Path), exclude);
  					totalSizeBytes += dirSize;
  				break;
  			}
  		}
  		return totalSizeBytes ;
  	}

    createSymlink (srcpath, dstpath, callback){
  		var res= null ;
  		try {
  			res = fs.statSync(srcpath);
  			try{
  				// LINK
  				res = fs.lstatSync(dstpath);
  				if ( res ){ fs.unlinkSync(dstpath) ;}
  			}catch(e){
  				//console.log("PASS CATCH")
  				//console.log(e ,"ERROR")
  			}
  			//console.log(srcpath+" : "+ dstpath);
  			res = fs.symlink(srcpath, dstpath, (e) => {
  					if(!e || (e && e.code === 'EEXIST')){
  					callback(srcpath, dstpath);
  					} else {
    					this.logger(e,"ERROR");
  					}
  			});
  			callback(srcpath, dstpath);
  		}catch(e){
  			this.logger("FILE :"+srcpath +" not exist: "+e,"ERROR");
  		}
  	}

    createDirectory (Path, mode, callback, force){
  		try {
  			fs.mkdirSync(Path, mode);
  			var file = new nodefony.fileClass(Path);
  			callback( file );
  			return file ;
  		}catch(e){
  			switch ( e.code ){
  				case "EEXIST" :
  					if ( force ){
  						var file = new nodefony.fileClass(Path);
  						callback( file );
  						return file ;
  					}
  				break;
  			}
  			throw e ;
  		}
  	}

    spawn (command , args, options, close){
  		var cmd = null ;
  		try {
  			cmd = spawn(command , args, options);

  			cmd.stdout.on('data', (data) => {
  				this.logger(data.toString());
  			});
  			cmd.stderr.on('data', (data) => {
  				this.logger(data.toString(), "ERROR");
  			});
  			cmd.on('close', (code) => {
  				this.logger(`child process exited with code ${code}`);
  				if ( close ){
  					close( code);
  				}
  			});
  			cmd.on('error', (err) => {
  				this.logger(err, "ERROR");
  				this.terminate(1);
  			})
  		}catch(e){
  			this.logger(e, "ERROR");
  			throw e;
  		}
  		return cmd ;
  	}

  	spawnSync (command , args, options){
  		try {
  			var cmd = spawnSync(command, args, options);
  			if ( cmd.output[2].toString() ){
  				this.logger( cmd.output[2].toString() ,"ERROR");
  			}else{
  				if ( cmd.output[1].toString() ){
  					this.logger( cmd.output[1].toString() );
  				}
  			}
  		}catch(e){
  			this.logger(e, "ERROR");
  			throw e;
  		}
  		return cmd ;
  	}

  	displayTable ( datas, options , syslog){
  		var table = new Table(  options ||  defaultTableCli  );

  		if ( datas ) {
  			for ( var i= 0 ;  i < datas.length ; i++ ){
  				table.push( datas[i] )
  			}
            if ( syslog ){
                syslog.logger( "\n"+ table.toString()) ;
            }else{
  			     console.log(table.toString());
            }

  		}
  		return table ;
  	}

    static niceBytes (x){
      let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
             n = parseInt(x, 10) || 0,
             l = 0;
       while(n >= 1024){
             n = n/1024;
             l++;
       }
       return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
  	}

    getEmoji (name){
			if (name){
				return this.emoji.get(name);
			}
			return this.emoji.random().emoji ;
	  }

  	clear (){
  				this.clui.Clear();
  	}

  	reset (){
  			process.stdout.write(this.clc.reset);
  	}

  	resize (){
  			process.stdout.on('resize', () => {
  				this.fire("onResize", this);
  			});
  	}

    terminate (code){
  	  process.exit(code);
  	}

    quit (code){
  	  process.exit(code);
  	}

    startTimer (name){
      this.startTime = new Date();
      this.logger(" BEGIN TIMER : " + name, "INFO");
    }

  	stopTimer (name){
        if (this.startTime){
  	     this.stopTime = new Date();
  	     this.time = (this.stopTime.getTime() - this.startTime.getTime());
  	     this.logger( "TIMER "+ name + " execute in : "+ this.time/1000 + " s" ,"INFO" )	;
        }else{
  	     return ;
        }
        this.startTime = null;
  	}
  };
  nodefony.niceBytes = CLI.niceBytes ;
  return CLI ;
});
