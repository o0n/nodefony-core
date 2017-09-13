/*
*
*
*
*  CONTROLLER test unit
*
*
*
*
*/

module.exports = nodefony.registerController("rest", function(){

    const restController = class restController extends nodefony.controller {

        constructor(container, context){
            super(container, context);
        }

        /**
        *
        *  Routing
        *
        */
        ["401Action"](){
            return this.createUnauthorizedException();
        }

        ["403Action"](){
            this.response.setStatusCode(403) ;
            throw new Error();
        }

    };

    return restController;
});
