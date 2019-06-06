const Sequelize = require("sequelize");
module.exports = nodefony.registerFixture("deviceType", function(){


	const deviceType = function(resolve, reject){

		let deviceTypeEntity = this.getEntity("deviceType");


		let tab = [{	
				name		: "RASPBERRYPI_CONSOLE",
				svg			: '<svg class="raspi" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="340"><style xmlns="http://www.w3.org/1999/xhtml"></style><defs><linearGradient id="ExmoMalWOwyT" x1="0px" x2="0px" y1="100px" y2="-50px" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e06666"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs><g transform="translate(0,0)"><g><rect fill="#FFFFFF" stroke="none" x="0" y="0" width="326" height="340"/></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,50,30)"><g transform="translate(4,4) scale(1.002,1.0017857142857143)"><g><g transform="translate(0,0) scale(2.5,2.8)"><g><path fill="#000000" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z" opacity="0.294117647"/><g transform="scale(0.4,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="rgb(0,0,0)" d="M 0 0 M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-opacity="0" stroke-miterlimit="10" opacity="0.294117647"/></g></g></g></g></g><g><g transform="translate(0,0) scale(2.5,2.8)"><g><path fill="url(#ExmoMalWOwyT)" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(0.4,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="url(#ExmoMalWOwyT)" stroke="#000000" d="M 0 0 M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="matrix(1,0,0,1,60,161)"><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/><text class="hostname" fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="16px" font-style="italic" font-weight="700" text-decoration="" line-height="18.5px" x="56" y="16">RASPBERRYPI</text></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,74,296)"><g><g transform="translate(0,0) scale(0.5,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(2,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 50 0 Q 50 0 50 0 L 50 24 Q 50 24 50 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 50 0 Q 50 0 50 0 L 50 24 Q 50 24 50 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="matrix(1,0,0,1,25,281)"><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="50" y="12">Ethernet</text></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g></g><g transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,272,197)"><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="58" y="12">HDMI</text></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g></g><g transform="matrix(1,0,0,1,282.7988309473749,88.7874251497006)"><g transform="translate(0,0)"><g transform="translate(-303.4444064982581,-77.94610778443113) translate(20.645575550883223,-10.841317365269461) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.9118525333415 93.2874251497006 Q 291.9118525333415 100.59281437125748 289.6053417403582 100.59281437125748 Q 287.2988309473749 100.59281437125748 287.2988309473749 107.89820359281437" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,286.4892482161482,142.84730538922153)"><g transform="translate(0,0)"><g transform="translate(-290.9892482161482,-147.34730538922153) translate(4.5,4.5) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 290.9892482161482 147.34730538922153 L 297.92414028631504 147.34730538922153" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,293.18580936140825,89.13321703491908)"><g transform="translate(0,0)"><g transform="translate(-297.68580936140825,-148.4431137724551) translate(4.5,59.30989673753601) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 297.68580936140825 146.98703755809123 L 297.68580936140825 93.63321703491908" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,282.79883094737494,129.69760479041918)"><g transform="translate(0,0)"><g transform="translate(-303.4444064982581,-104.24550898203593) translate(20.645575550883166,-25.45209580838325) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.45823022035324 147.7125748502994 Q 291.45823022035324 140.9550898203593 289.37853058386406 140.9550898203593 Q 287.29883094737494 140.9550898203593 287.29883094737494 134.19760479041918" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,287.41953237894995,88.7874251497006)"><g transform="translate(0,0)"><g transform="translate(-290.9892482161482,-93.2874251497006) translate(3.5697158371982596,4.5) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.91953237894995 93.2874251497006 L 297.92414028631504 93.2874251497006" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,282.57585971368496,103.03293413173654)"><g transform="translate(0,0)"><g transform="translate(-287.07585971368496,-134.56287425149702) translate(4.5,31.529940119760482) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 287.07585971368496 135.29581615820967 L 287.07585971368496 107.53293413173654" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,155,274)"><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="61" y="12">USB</text></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,194,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,214,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,234,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,254,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g></g></svg>',
				logo		: "raspberry-pi-logo.png",
				console 	: true,
				svgConsole	: '<svg class="hubusb" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="340"><style xmlns="http://www.w3.org/1999/xhtml"></style><defs><linearGradient id="EAxtNJFCXvmC" x1="0px" x2="0px" y1="100px" y2="-50px" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999999"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs><g transform="translate(0,0)"><g><rect fill="#FFFFFF" stroke="none" x="0" y="0" width="1000" height="340"/></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,50,40)"><g transform="translate(4,4) scale(1.000537634408602,1.0017857142857143)"><g><g transform="translate(0,0) scale(9.3,2.8)"><g><path fill="#000000" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z" opacity="0.294117647"/><g transform="scale(0.1075268817204301,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 930.0000000000001 0 Q 930.0000000000001 0 930.0000000000001 0 L 930.0000000000001 280 Q 930.0000000000001 280 930.0000000000001 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="rgb(0,0,0)" d="M 0 0 M 0 0 L 930.0000000000001 0 Q 930.0000000000001 0 930.0000000000001 0 L 930.0000000000001 280 Q 930.0000000000001 280 930.0000000000001 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-opacity="0" stroke-miterlimit="10" opacity="0.294117647"/></g></g></g></g></g><g><g transform="translate(0,0) scale(9.3,2.8)"><g><path fill="url(#EAxtNJFCXvmC)" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(0.1075268817204301,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 930.0000000000001 0 Q 930.0000000000001 0 930.0000000000001 0 L 930.0000000000001 280 Q 930.0000000000001 280 930.0000000000001 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="url(#EAxtNJFCXvmC)" stroke="#000000" d="M 0 0 M 0 0 L 930.0000000000001 0 Q 930.0000000000001 0 930.0000000000001 0 L 930.0000000000001 280 Q 930.0000000000001 280 930.0000000000001 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="matrix(1,0,0,1,332,50)"><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/></g><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/></g><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/></g><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/></g><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="16px" font-style="italic" font-weight="700" text-decoration="" line-height="18.5px" x="138" y="16">HUB</text><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="16px" font-style="italic" font-weight="700" text-decoration="" line-height="18.5px" x="178" y="16">USB</text></g><g transform="translate(627,20) matrix(1,0,0,1,0,0) translate(-627,-20)"><g/></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,100,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,150,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,200,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,250,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,300,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,350,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,400,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,450,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,500,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,550,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,600,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,650,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,700,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,750,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,800,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,850,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,900,90)"><g><g transform="translate(0,0) scale(0.2,1.9)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(5,0.5263157894736842)"><path fill="none" stroke="none" d="M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 20 0 Q 20 0 20 0 L 20 190 Q 20 190 20 190 L 0 190 Q 0 190 0 190 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g></g></svg>'

			},{
				name		: "RASPBERRYPI",
				svg			: '<svg class="raspi" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="340"><style xmlns="http://www.w3.org/1999/xhtml"></style><defs><linearGradient id="ExmoMalWOwyT" x1="0px" x2="0px" y1="100px" y2="-50px" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e06666"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs><g transform="translate(0,0)"><g><rect fill="#FFFFFF" stroke="none" x="0" y="0" width="326" height="340"/></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,50,30)"><g transform="translate(4,4) scale(1.002,1.0017857142857143)"><g><g transform="translate(0,0) scale(2.5,2.8)"><g><path fill="#000000" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z" opacity="0.294117647"/><g transform="scale(0.4,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="rgb(0,0,0)" d="M 0 0 M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-opacity="0" stroke-miterlimit="10" opacity="0.294117647"/></g></g></g></g></g><g><g transform="translate(0,0) scale(2.5,2.8)"><g><path fill="url(#ExmoMalWOwyT)" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(0.4,0.35714285714285715)"><path fill="none" stroke="none" d="M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z"/><path fill="url(#ExmoMalWOwyT)" stroke="#000000" d="M 0 0 M 0 0 L 250 0 Q 250 0 250 0 L 250 280 Q 250 280 250 280 L 0 280 Q 0 280 0 280 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="matrix(1,0,0,1,60,161)"><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/><text class="hostname" fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="16px" font-style="italic" font-weight="700" text-decoration="" line-height="18.5px" x="56" y="16">RASPBERRYPI</text></g><g transform="translate(343,20) matrix(1,0,0,1,0,0) translate(-343,-20)"><g/></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,74,296)"><g><g transform="translate(0,0) scale(0.5,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(2,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 50 0 Q 50 0 50 0 L 50 24 Q 50 24 50 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 50 0 Q 50 0 50 0 L 50 24 Q 50 24 50 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="matrix(1,0,0,1,25,281)"><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="50" y="12">Ethernet</text></g><g transform="translate(196,0) matrix(1,0,0,1,0,0) translate(-196,0)"><g/></g></g><g transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,272,197)"><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="58" y="12">HDMI</text></g><g transform="translate(205,0) matrix(1,0,0,1,0,0) translate(-205,0)"><g/></g></g><g transform="matrix(1,0,0,1,282.7988309473749,88.7874251497006)"><g transform="translate(0,0)"><g transform="translate(-303.4444064982581,-77.94610778443113) translate(20.645575550883223,-10.841317365269461) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.9118525333415 93.2874251497006 Q 291.9118525333415 100.59281437125748 289.6053417403582 100.59281437125748 Q 287.2988309473749 100.59281437125748 287.2988309473749 107.89820359281437" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,286.4892482161482,142.84730538922153)"><g transform="translate(0,0)"><g transform="translate(-290.9892482161482,-147.34730538922153) translate(4.5,4.5) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 290.9892482161482 147.34730538922153 L 297.92414028631504 147.34730538922153" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,293.18580936140825,89.13321703491908)"><g transform="translate(0,0)"><g transform="translate(-297.68580936140825,-148.4431137724551) translate(4.5,59.30989673753601) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 297.68580936140825 146.98703755809123 L 297.68580936140825 93.63321703491908" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,282.79883094737494,129.69760479041918)"><g transform="translate(0,0)"><g transform="translate(-303.4444064982581,-104.24550898203593) translate(20.645575550883166,-25.45209580838325) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.45823022035324 147.7125748502994 Q 291.45823022035324 140.9550898203593 289.37853058386406 140.9550898203593 Q 287.29883094737494 140.9550898203593 287.29883094737494 134.19760479041918" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,287.41953237894995,88.7874251497006)"><g transform="translate(0,0)"><g transform="translate(-290.9892482161482,-93.2874251497006) translate(3.5697158371982596,4.5) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 291.91953237894995 93.2874251497006 L 297.92414028631504 93.2874251497006" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,282.57585971368496,103.03293413173654)"><g transform="translate(0,0)"><g transform="translate(-287.07585971368496,-134.56287425149702) translate(4.5,31.529940119760482) matrix(1,0,0,1,0,0)"><g><path fill="none" stroke="#000000" d="M 287.07585971368496 135.29581615820967 L 287.07585971368496 107.53293413173654" stroke-miterlimit="10" stroke-width="2"/></g></g></g></g><g transform="matrix(1,0,0,1,155,274)"><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/><text fill="rgb(0, 0, 0)" stroke="none" font-family="&quot;Arial&quot;" font-size="12px" font-style="normal" font-weight="normal" text-decoration="" line-height="14px" x="61" y="12">USB</text></g><g transform="translate(208,0) matrix(1,0,0,1,0,0) translate(-208,0)"><g/></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,194,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,214,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,234,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g><g transform="translate(0.5,0.5) matrix(1,0,0,1,254,296)"><g><g transform="translate(0,0) scale(0.1,0.24)"><g><path fill="#ffffff" stroke="none" d="M 0 0 L 100 0 Q 100 0 100 0 L 100 100 Q 100 100 100 100 L 0 100 Q 0 100 0 100 L 0 0 Q 0 0 0 0 Z"/><g transform="scale(10,4.166666666666667)"><path fill="none" stroke="none" d="M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z"/><path fill="none" stroke="#000000" d="M 0 0 M 0 0 L 10 0 Q 10 0 10 0 L 10 24 Q 10 24 10 24 L 0 24 Q 0 24 0 24 L 0 0 Q 0 0 0 0 Z" stroke-miterlimit="10"/></g></g></g></g></g></g></svg>',
				logo		: "raspberry-pi-logo.png"
			},{
				name	: "VM",
				svg		: "",
				logo	: "vm-logo.png"
		}];

		let connection = this.getConnection("console");

		switch ( connection.options.dialect ){

			case "mysql" :
				connection.query('SET FOREIGN_KEY_CHECKS = 0')
				.then( () => {
			 		return deviceTypeEntity.sync({ force: false });
				})
				.then((DeviceType) => {
					this.logger("Database synchronised  " ,"INFO");
					return Sequelize.Promise.map( tab, (obj) => {
						return DeviceType.findOrCreate({where: {name: obj.name}, defaults:obj});
					});
				})
				.spread( function()  {
					for (var i = 0 ; i< arguments.length ;i++){
						if (arguments[i][1]){
							this.logger("ADD DEVICE TYPE : " +arguments[i][0].name,"INFO");
						}else{
							this.logger("ALREADY EXIST DEVICE TYPE: " +arguments[i][0].name,"INFO");
						}
					}
				}.bind(this) )
				.then( () => {
			    		connection.query('SET FOREIGN_KEY_CHECKS = 1');
				})
				.catch( (error) => {
					this.logger(error);
					reject(error);
				})
				.done((error, result) => {
					resolve("deviceTypeEntity");
				});
			break;
			case "sqlite":
				
				connection.query('PRAGMA foreign_keys = 0  ')
				.then( () => {
			 		return deviceTypeEntity.sync({ force: false });
				})
				.then(  (DeviceType) =>  {
					this.logger("Database synchronised  " ,"INFO");
					return Sequelize.Promise.map( tab, function (obj)  {
						return  DeviceType.findOrCreate({where: {name: obj.name}, defaults:obj});
					});
				})
				.spread( function() {
					for (var i = 0 ; i< arguments.length ;i++){
						if (arguments[i][1]){
							console.log
							this.logger("ADD DEVICE TYPE: " +arguments[i][0].name,"INFO");
						}else{
							this.logger("ALREADY EXIST DEVICE TYPE: " +arguments[i][0].name,"INFO");
						}
					}
				}.bind(this))
				.catch( (error) => {
					this.logger(error);
					reject(error);
				})
				.done( () =>{
					resolve("deviceTypeEntity");
				});
			break;
		}
	};

	return {
		type:"sequelize",
		connection : "console",
		entity: "deviceType",
		fixture: deviceType
	};
});