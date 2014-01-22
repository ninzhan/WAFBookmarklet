angular.module("polygon_module",[]);var myapp=angular.module("image_annotator",["ui.bootstrap","polygon_module"]);myapp.directive("imageAnnotator",function(){return{restrict:"E",templateUrl:"templates/directive_template.html",scope:{confName:"="},link:function(a){a.conf=window[a.confName]},controller:"directiveController"}}),myapp.controller("directiveController",["$scope","$modal",function(a,b){a.open=function(){var c="myUniqueName"+Math.floor(1e4*Math.random());b.open({templateUrl:"templates/modal_template.html",controller:"modalController",windowClass:c,resolve:{conf:function(){return a.conf},myUniqueClassName:function(){return c}}})}}]),myapp.constant("CONSTANT",{TOOLBAR_EVT:{clickSelect:"clickSelect",clickPan:"clickPan",clickDraw:"clickDraw",clickZoomIn:"clickZoomIn",clickZoomOut:"clickZoomOut",clickUndo:"clickUndo",clickRedo:"clickRedo"},MODE_TYPE:{select:"selectMode",draw:"drawMode",pan:"panMode",any:"any"},BTN_CLASS:{selected:"btn btn-default button_selected",unselected:"btn btn-default"},BTN_ICON:{collapseUp:"glyphicon glyphicon-chevron-up",collapseDown:"glyphicon glyphicon-chevron-down",enterFullScreen:"glyphicon glyphicon-resize-full",exitFullScreen:"glyphicon glyphicon-resize-small"}}),angular.module("image_annotator").controller("modalController",["conf","$scope","$rootScope","$modalInstance","$window","CONSTANT","myUniqueClassName","utilityService","conversionService","fullScreenService","zoomService","panService",function(a,b,c,d,e,f,g,h,i,j,k,l){b.conf=a;var m,n={worldZoomLevel:1,mode:void 0,evtWorld:{isMousedown:!1},modalBodyDim:{height:320,width:598},panInfo:{enableVertical:!1,enableOrizontal:!1,x:0,y:0,left:0,top:0},panStopped:{up:!1,down:!1,right:!1,left:!1,x:0,y:0},maskDim:{width:0,height:0},worldDim:{width:0,height:0,fitWidth:0,fitHeight:0,leftToFit:0,topToFit:0},modalDialogPos:{left:0,top:0},domElement:{modalDialog:void 0,modalContainer:void 0,modalBody:void 0,modalHeader:void 0,modalFooter:void 0,mask:void 0,world:void 0,image:void 0}},o=function(){clearTimeout(m),m=setTimeout(function(){var a=n.domElement,b=e.innerHeight-a.modalHeader.offsetHeight-a.modalFooter.offsetHeight-37;if(j.isFullScreen){j.preFullScreenHeight=a.modalBody.offsetHeight,j.resizeModalFullScreen(a.modalBody,b);var c=e.innerWidth-22;angular.element(a.mask).css("height",b+"px"),angular.element(a.mask).css("width",c+"px");var d=h.fitWorld(a);h.setDimensionAttribute(n.worldDim,d)}else{r();var f=n.modalBodyDim;angular.element(a.mask).css("height",f.height+"px"),angular.element(a.mask).css("width",f.width+"px");var d=h.fitWorld(a);h.setDimensionAttribute(n.worldDim,d)}},100)},p=function(){var a=n.modalBodyDim;angular.element(n.domElement.mask).css("height",a.height+"px"),angular.element(n.domElement.mask).css("width",a.width+"px"),n.maskDim.height=a.height,n.maskDim.width=a.width;var b=h.fitWorld(n.domElement);h.setDimensionAttribute(n.worldDim,b),r()},q=function(){var a=n.domElement;a.modalBody=e.document.querySelector("div."+g+" .modal-body"),a.modalContainer=angular.element(a.modalBody).parent().parent().parent()[0],a.modalDialog=e.document.querySelector("div.modal-dialog"),a.modalHeader=e.document.querySelector("div.modal-header"),a.modalFooter=e.document.querySelector("div.modal-footer"),a.mask=a.modalBody.querySelector("div.mask"),a.world=a.modalBody.querySelector("div.world"),a.image=a.world.querySelector("#main-img"),j.addFullScreenElement(a.modalContainer,a.modalBody),j.addFullScreenListener(e.document),angular.element(a.world).bind("mousewheel",y),angular.element(e).bind("resize",o),angular.element(a.image).bind("load",p)},r=function(){var a=n.domElement,b=(e.innerWidth-a.modalDialog.offsetWidth)/2,c=(e.innerHeight-a.modalDialog.offsetHeight)/2;h.setElementMarginLeft(a.modalDialog,b),h.setElementMarginTop(a.modalDialog,c),n.modalDialogPos.left=b,n.modalDialogPos.top=c},s=function(a){a?(n.panInfo.enableVertical||n.panInfo.enableOrizontal)&&(angular.element(n.domElement.world).removeClass("not-pannable"),angular.element(n.domElement.world).addClass("pannable")):(angular.element(n.domElement.world).removeClass("pannable"),angular.element(n.domElement.world).addClass("not-pannable"))};d.opened.then(function(){b.$watch(function(){return e.document.querySelector("div."+g+".fade.modal.in")},function(){e.document.querySelector("div."+g+".fade.modal.in")&&q()})}),b.exit=function(){d.dismiss()};var t=function(){console.log("evt toolbar click zoom out");var a=n;if(a.worldZoomLevel=k.zoom(a.domElement.world,a.worldDim,a.maskDim,a.worldZoomLevel,-.25,.5,.5),a.mode===f.MODE_TYPE.pan){var b=l.tryToDisablePan(a.worldDim,a.maskDim,a.panInfo);b&&s(!b)}c.$emit("eventzoom")},u=function(){console.log("evt toolbar click zoom in");var a=n;if(a.worldZoomLevel=k.zoom(a.domElement.world,a.worldDim,a.maskDim,a.worldZoomLevel,.25,.5,.5),a.mode===f.MODE_TYPE.pan){var b=l.tryToEnablePan(a.worldDim,a.maskDim,a.panInfo);b&&s(b)}c.$emit("eventzoom")},v=function(a,b){console.log("evt toolbar clicked pan btn");var c=n;if(c.mode=b,c.mode!==f.MODE_TYPE.pan)c.panInfo.enableOrizontal=!1,c.panInfo.enableVertical=!1;else{var d=l.tryToEnablePan(c.worldDim,c.maskDim,c.panInfo);d&&s(d)}console.log(b)},w=function(a,b){console.log("evt toolbar clicked select btn"),n.panInfo.enableVertical=!1,n.panInfo.enableOrizontal=!1,n.mode=b,console.log(b)},x=function(a,b){console.log("evt toolbar clicked draw btn"),n.panInfo.enableVertical=!1,n.panInfo.enableOrizontal=!1,n.mode=b,console.log(b)};c.$on(f.TOOLBAR_EVT.clickSelect,w),c.$on(f.TOOLBAR_EVT.clickPan,v),c.$on(f.TOOLBAR_EVT.clickDraw,x),c.$on(f.TOOLBAR_EVT.clickZoomIn,u),c.$on(f.TOOLBAR_EVT.clickZoomOut,t),b.dbclickWorld=function(a){console.log("evt dbclick world");var b=n;if(b.mode!==f.MODE_TYPE.draw&&b.mode!==f.MODE_TYPE.select){var d=i.windowToMask(b.modalDialogPos,b.domElement,{x:a.clientX,y:a.clientY}),e=i.maskToWorld(b.domElement.world,d),g=i.normalize(b.worldDim,e);if(b.worldZoomLevel=k.zoom(b.domElement.world,b.worldDim,b.maskDim,b.worldZoomLevel,.25,g.x,g.y),b.mode===f.MODE_TYPE.pan){var h=l.tryToEnablePan(b.worldDim,b.maskDim,b.panInfo);h&&s(h)}}c.$emit("eventzoom")};var y=function(a){var b=n,a=window.event||a,d=Math.max(-1,Math.min(1,a.wheelDelta||-a.detail)),e=i.windowToMask(b.modalDialogPos,b.domElement,{x:a.clientX,y:a.clientY}),g=i.maskToWorld(b.domElement.world,e),h=i.normalize(b.worldDim,g);if(b.worldZoomLevel=k.zoom(b.domElement.world,b.worldDim,b.maskDim,b.worldZoomLevel,.25*d,h.x,h.y),b.mode===f.MODE_TYPE.pan)if(d>0){var j=l.tryToEnablePan(b.worldDim,b.maskDim,b.panInfo);j&&s(j)}else{var j=l.tryToDisablePan(b.worldDim,b.maskDim,b.panInfo);j&&s(!j)}return c.$emit("eventzoom"),!1};b.mousedownWorld=function(a){if(n.mode===f.MODE_TYPE.pan){var b=h.getElementLeft(n.domElement.world),c=h.getElementTop(n.domElement.world);n.evtWorld.isMousedown=!0,n.panInfo.x=a.clientX,n.panInfo.y=a.clientY,n.panInfo.left=b,n.panInfo.top=c}},b.mouseupWorld=function(){n.evtWorld.isMousedown=!1},b.mousemoveWorld=function(a){var b=n;if(b.mode===f.MODE_TYPE.pan&&b.evtWorld.isMousedown){if(b.panInfo.enableOrizontal){var c=b.maskDim.width;l.panOrizontal(a,a.clientX-b.panInfo.x,b.domElement.world,c,b.panInfo,b.panStopped)}if(b.panInfo.enableVertical){var d=b.maskDim.height;l.panVertical(a,a.clientY-b.panInfo.y,b.domElement.world,d,b.panInfo,b.panStopped)}}},b.mouseenterWorld=function(){(n.panInfo.enableVertical||n.panInfo.enableOrizontal)&&s(!0)},b.mouseleaveWorld=function(){s(!1)},b.clickWorld=function(){console.log("evt click world")}}]),angular.module("image_annotator").controller("toolbarController",["$scope","$rootScope","CONSTANT","fullScreenService",function(a,b,c,d){var e={draw:!1,select:!1,pan:!1},f={select:d3.select(".ia-select"),draw:d3.select(".ia-draw"),pan:d3.select(".ia-pan")},g={btn_selected:"button-selected"},h=c.MODE_TYPE.any;a.buttonIcon={collapse:c.BTN_ICON.collapseUp,fullScreen:c.BTN_ICON.enterFullScreen},a.toolbarCollapse=!1,a.actions=["Action1","Action2","Action3"],a.onClickCollapse=function(){var b=a.toolbarCollapse;a.buttonIcon.collapse=b?c.BTN_ICON.collapseUp:c.BTN_ICON.collapseDown,a.toolbarCollapse=!b},a.onClickFullScreen=function(){d.isFullScreen?(d.exitFullScreen(),a.buttonIcon.fullScreen=c.BTN_ICON.enterFullScreen):(d.goFullScreen(),a.buttonIcon.fullScreen=c.BTN_ICON.exitFullScreen)},a.onClickZoomOut=function(){b.$emit(c.TOOLBAR_EVT.clickZoomOut)},a.onClickZoomIn=function(){b.$emit(c.TOOLBAR_EVT.clickZoomIn)},a.onClickUndo=function(){b.$emit(c.TOOLBAR_EVT.clickUndo)},a.onClickRedo=function(){b.$emit(c.TOOLBAR_EVT.clickRedo)},a.onClickSelect=function(){e.select=!e.select,e.select?(h=c.MODE_TYPE.select,e.draw=!1,e.pan=!1):h=c.MODE_TYPE.any,f.select.classed(g.btn_selected,e.select),f.pan.classed(g.btn_selected,!1),f.draw.classed(g.btn_selected,!1),b.$emit(c.TOOLBAR_EVT.clickSelect,h)},a.onClickPan=function(){e.pan=!e.pan,e.pan?(h=c.MODE_TYPE.pan,e.select=!1,e.draw=!1):h=c.MODE_TYPE.any,f.select.classed(g.btn_selected,!1),f.pan.classed(g.btn_selected,e.pan),f.draw.classed(g.btn_selected,!1),b.$emit(c.TOOLBAR_EVT.clickPan,h)},a.onClickDraw=function(){e.draw=!e.draw,e.draw?(h=c.MODE_TYPE.draw,e.pan=!1,e.select=!1):h=c.MODE_TYPE.any,f.select.classed(g.btn_selected,!1),f.pan.classed(g.btn_selected,!1),f.draw.classed(g.btn_selected,e.draw),b.$emit(c.TOOLBAR_EVT.clickDraw,h)}}]),angular.module("image_annotator").controller("svgController",["$scope","$rootScope","CONSTANT","polygonViewService","conversionService","polygonService",function(a,b,c,d,e,f){var g={drawing:!1,drawingPoly:void 0,d3:{svg:d3.select("#main-svg"),firstNode:void 0,polyContainer:void 0},dom:{},polygons:[]};g.dom.svg=g.d3.svg[0][0];var h,i=c.MODE_TYPE.any,j=d.node.rad,k=1.5*j,l=2*j,m={normal_status:"normal-status",hover_status:"hover-status",selected_status:"selected-status",drawing_status:"drawing-status",first_node:"first-node"},n=function(a,d){i=d,i===c.MODE_TYPE.draw?(g.d3.svg.on("click",u),b.$on("eventzoom",h)):(g.d3.svg.on("click",null),b.$on("eventzoom",null))},h=function(){console.log("update polygons"),g.d3.svg.selectAll("g").remove();var a,b;for(a=0;a<g.polygons.length;a++)b=d.createSvgPolygon(g.d3.svg,g.dom.svg,g.polygons[a]),b.polyContainer.classed(m.normal_status,!0),b.polyContainer.on("mouseenter",o),b.polyContainer.on("mouseleave",p);g.polygons[a-1].closed||(b.polyContainer.classed(m.normal_status,!1),b.polyContainer.classed(m.drawing_status,!0),b.polyContainer.on("mouseenter",null),b.polyContainer.on("mouseleave",null),b.firstNode.classed(m.first_node,!0),b.firstNode.on("click",t),b.firstNode.on("mouseenter",q),b.firstNode.on("mouseleave",r),g.d3.polyContainer=b.polyContainer,g.d3.firstNode=b.firstNode)};b.$on(c.TOOLBAR_EVT.clickSelect,n),b.$on(c.TOOLBAR_EVT.clickPan,n),b.$on(c.TOOLBAR_EVT.clickDraw,n);var o=function(){d3.select(this).classed(m.normal_status,!1),d3.select(this).classed(m.hover_status,!0)},p=function(){d3.select(this).classed(m.hover_status,!1),d3.select(this).classed(m.normal_status,!0)},q=function(){g.d3.firstNode.attr("r",l)},r=function(){g.d3.firstNode.attr("r",k)},s=function(){d3.select(this).attr("cx",d3.event.x).attr("cy",d3.event.y)},t=function(){var a={width:g.dom.svg.offsetWidth,height:g.dom.svg.offsetHeight};f.closePolygon(g.drawingPoly);var b=g.drawingPoly.points.length,c=e.deNormalize(a,g.drawingPoly.points[b-2]),h=e.deNormalize(a,g.drawingPoly.points[0]);d.addSvgLine(c,h,g.d3.polyContainer),g.d3.firstNode.attr("r",j).classed(m.first_node,!1),g.d3.polyContainer.classed(m.drawing_status,!1),g.d3.polyContainer.classed(m.normal_status,!0),g.d3.firstNode.on("click",null),g.d3.firstNode.on("mouseenter",null),g.d3.firstNode.on("mouseleave",null),g.d3.polyContainer.on("mouseenter",o),g.d3.polyContainer.on("mouseleave",p),g.drawing=!1,g.d3.firstNode=void 0,g.d3.polyContainer=void 0,d3.event.stopPropagation()},u=function(){if(console.log("draw click handler"),!d3.event.defaultPrevented){var a=d3.mouse(this),b={width:g.dom.svg.offsetWidth,height:g.dom.svg.offsetHeight},c=e.normalize(b,{x:a[0],y:a[1]});if(g.drawing){f.addNode(g.drawingPoly,c);var h={x:a[0],y:a[1]},i=g.drawingPoly.points.length,j=e.deNormalize(b,g.drawingPoly.points[i-2]);d.addSvgLine(j,h,g.d3.polyContainer),d.addSvgNode(g.d3.polyContainer,h),3===i&&(g.d3.firstNode.on("click",t),g.d3.firstNode.on("mouseenter",q),g.d3.firstNode.on("mouseleave",r))}else{g.drawing=!0;var k=f.createNode(c.x,c.y),l=f.createPoly([k]);g.polygons.push(l),g.drawingPoly=l;var n=d.createSvgPolygon(g.d3.svg,g.dom.svg,l);g.d3.firstNode=n.firstNode,g.d3.polyContainer=n.polyContainer,g.d3.firstNode.classed(m.first_node,!0),g.d3.polyContainer.classed(m.drawing_status,!0),g.d3.firstNode.call(d3.behavior.drag().on("drag",s))}d3.event.stopPropagation()}}}]),angular.module("image_annotator").service("utilityService",function(){var a={};return a.setElementWidth=function(a,b){angular.element(a).css("width",b+"px")},a.getElementWidth=function(a){var b=angular.element(a).css("width");return parseInt(b,10)},a.setElementHeight=function(a,b){angular.element(a).css("height",b+"px")},a.getElementHeight=function(a){var b=angular.element(a).css("height");return parseInt(b,10)},a.getElementTop=function(a){var b=angular.element(a).css("top");return b=b.substring(0,b.length-2),Number(b)},a.setElementTop=function(a,b){angular.element(a).css("top",b+"px")},a.setElementMarginTop=function(a,b){angular.element(a).css("margin-top",b+"px")},a.getElementLeft=function(a){var b=angular.element(a).css("left");return b=b.substring(0,b.length-2),Number(b)},a.setElementLeft=function(a,b){angular.element(a).css("left",b+"px")},a.setElementMarginLeft=function(a,b){angular.element(a).css("margin-left",b+"px")},a.translateElement=function(a,b,c){angular.element(a).css("left",b+"px"),angular.element(a).css("top",c+"px")},a.setCursorToPointer=function(a){angular.element(a).css("cursor","pointer")},a.setCursorToMove=function(a){angular.element(a).css("cursor","move")},a.setCursorToAuto=function(a){angular.element(a).css("cursor","auto")},a.fitWorld=function(b){var c={fitHeight:0,fitWidth:0,leftToFit:0,topToFit:0,width:0,height:0},d=b.image.naturalWidth,e=b.image.naturalHeight,f=a.getElementHeight(b.mask),g=a.getElementWidth(b.mask),h=f/e,i=g/d,j=h>=i?i:h,k=e*j,l=d*j;return angular.element(b.world).css("height",k+"px"),angular.element(b.world).css("width",l+"px"),a.translateElement(b.world,(g-l)/2,(f-k)/2),c.fitHeight=k,c.fitWidth=l,c.leftToFit=(g-l)/2,c.topToFit=(f-k)/2,c.width=l,c.height=k,c},a.setDimensionAttribute=function(a,b){a.fitHeight=b.fitHeight,a.fitWidth=b.fitWidth,a.leftToFit=b.leftToFit,a.topToFit=b.topToFit,a.width=b.width,a.height=b.height},a}),angular.module("image_annotator").service("fullScreenService",["utilityService",function(a){var b={fullScreenElement:void 0,isFullScreen:!1,preFullScreenHeight:0,modalBody:void 0},c=function(){b.isFullScreen?(angular.element(b.fullScreenElement).toggleClass("fullscreen"),a.setElementHeight(b.modalBody,b.preFullScreenHeight)):(b.preFullScreenHeight=b.modalBody.offsetHeight,angular.element(b.fullScreenElement).toggleClass("fullscreen")),b.isFullScreen=!b.isFullScreen};return b.addFullScreenElement=function(a,c){b.fullScreenElement=a,b.modalBody=c},b.goFullScreen=function(){void 0!==b.fullScreenElement&&(b.fullScreenElement.requestFullScreen?b.fullScreenElement.requestFullScreen():b.fullScreenElement.mozRequestFullScreen?b.fullScreenElement.mozRequestFullScreen():b.fullScreenElement.webkitRequestFullScreen?b.fullScreenElement.webkitRequestFullScreen():b.fullScreenElement.msRequestFullScreen&&b.fullScreenElement.msRequestFullScreen())},b.exitFullScreen=function(){void 0!==b.fullScreenElement&&(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen())},b.addFullScreenListener=function(a){a.addEventListener("fullscreenchange",c,!1),a.addEventListener("mozfullscreenchange",c,!1),a.addEventListener("webkitfullscreenchange",c,!1)},b.removeFullScreenListener=function(a){a.removeEventListener("fullscreenchange",c,!1),a.removeEventListener("mozfullscreenchange",c,!1),a.removeEventListener("webkitfullscreenchange",c,!1)},b.resizeModalFullScreen=function(a,c){b.isFullScreen&&angular.element(a).css("height",c+"px")},b}]),angular.module("image_annotator").service("communicateService",["$rootScope",function(a){var b={};return b.toolbarEvent={clickSelect:"clickSelect",clickPan:"clickPan",clickDraw:"clickDraw",clickZoomIn:"clickZoomIn",clickZoomOut:"clickZoomOut"},b.callback={onClickPan:void 0,onClickZoomIn:void 0,onClickZoomOut:void 0,onClickSelect:void 0,onClickDraw:void 0},a.$on(b.toolbarEvent.clickZoomIn,function(){var a=b.callback.onClickZoomIn;"function"==typeof a&&a()}),a.$on(b.toolbarEvent.clickZoomOut,function(){var a=b.callback.onClickZoomOut;"function"==typeof a&&a()}),a.$on(b.toolbarEvent.clickPan,function(){var a=b.callback.onClickPan;"function"==typeof a&&a()}),a.$on(b.toolbarEvent.clickSelect,function(){var a=b.callback.onClickSelect;"function"==typeof a&&a()}),a.$on(b.toolbarEvent.clickDraw,function(){var a=b.callback.onClickDraw;"function"==typeof a&&a()}),b}]),angular.module("image_annotator").service("conversionService",function(){var a={};return a.windowToMask=function(a,b,c){var d={};return d.x=c.x-a.left,d.y=c.y-a.top-b.modalHeader.offsetHeight,d},a.maskToWorld=function(a,b){var c={},d=angular.element(a).css("left");d=d.substring(0,d.length-2);var e=angular.element(a).css("top");return e=e.substring(0,e.length-2),c.x=b.x-Number(d),c.y=b.y-Number(e),c},a.normalize=function(a,b){var c={};return c.x=b.x/a.width,c.y=b.y/a.height,c},a.deNormalize=function(a,b){var c={};return c.x=b.x*a.width,c.y=b.y*a.height,c},a}),angular.module("image_annotator").service("zoomService",["utilityService",function(a){var b={};b.zoom=function(b,d,e,f,g,h,i){if(f+=g,1>f)f=1;else{var j=Math.round(d.fitWidth*f),k=Math.round(d.fitHeight*f),l=a.getElementLeft(b),m=a.getElementTop(b);angular.element(b).css("width",j+"px"),angular.element(b).css("height",k+"px");var n=Math.round(l+(d.width-j)*h),o=Math.round(m+(d.height-k)*i);angular.element(b).css("left",n+"px"),angular.element(b).css("top",o+"px"),d.width=j,d.height=k}return c(b,d,e),f};var c=function(b,c,d){var e=a.getElementLeft(b),f=a.getElementTop(b),g=c.width-d.width;if(0>=g)a.setElementLeft(b,g/2*-1);else{e>0&&a.setElementLeft(b,0);var h=e+c.width;h<d.width&&a.setElementLeft(b,e+d.width-h)}var i=c.height-d.height;if(0>=i)a.setElementTop(b,i/2*-1);else{f>0&&a.setElementTop(b,0);var j=f+c.height;j<d.height&&a.setElementTop(b,f+d.height-j)}};return b}]),angular.module("image_annotator").service("panService",["utilityService",function(a){var b={};return b.tryToEnablePan=function(a,b,c){var d=!1;return a.height>b.height&&(c.enableVertical=!0,d=!0),a.width>b.width&&(c.enableOrizontal=!0,d=!0),d},b.tryToDisablePan=function(a,b,c){var d=!1,e=!1;return a.height<=b.height&&(c.enableVertical=!1,e=!0),a.width<=b.width&&(c.enableOrizontal=!1,d=!0),d&&e},b.panOrizontal=function(b,c,d,e,f,g){var h=a.getElementWidth(d),i=f.left+c;if(!g.right&&i>0)i=0,f.left=0,g.right=!0,g.x=b.clientX,angular.element(d).css("left",i+"px");else if(!g.left&&e>i+h){var j=e-h;i=j,f.left=j,g.left=!0,g.x=b.clientX,angular.element(d).css("left",i+"px")}g.right?(b.clientX-g.x<0&&(g.right=!1,f.x=b.clientX),g.x=b.clientX):g.left?(b.clientX-g.x>0&&(g.left=!1,f.x=b.clientX),g.x=b.clientX):angular.element(d).css("left",i+"px")},b.panVertical=function(b,c,d,e,f,g){var h=a.getElementHeight(d),i=f.top+c;if(!g.down&&i>0)i=0,f.top=0,g.down=!0,g.y=b.clientY,angular.element(d).css("top",i+"px");else if(!g.up&&e>i+h){var j=e-h;i=j,f.top=j,g.up=!0,g.y=b.clientY,angular.element(d).css("top",i+"px")}g.up?(b.clientY-g.y>0&&(g.up=!1,f.y=b.clientY),g.y=b.clientY):g.down?(b.clientY-g.y<0&&(g.down=!1,f.y=b.clientY),g.y=b.clientY):angular.element(d).css("top",i+"px")},b}]),angular.module("polygon_module").service("polygonService",function(){var a={},b={id:0,name:"polygon"};return a.createNode=function(a,b){return{x:a,y:b}},a.createPoly=function(a,c,d,e){var f=b.id,g="undefined"==typeof a?[]:a,h="undefined"==typeof c?b.name.concat(f):c,i="undefined"==typeof d?!1:d,j="undefined"==typeof e?!1:e;return b.id=b.id+1,{id:f,name:h,selected:i,closed:j,points:g}},a.addNode=function(b,c){return b.points.push(a.createNode(c.x,c.y)),b},a.closePolygon=function(a){a.closed=!0,a.points.push(a.points[0])},a}),angular.module("polygon_module").service("polygonViewService",["conversionService",function(a){var b={};return b.node={rad:4.5},b.addSvgNode=function(a,c){return a.append("circle").attr("cx",c.x).attr("cy",c.y).attr("r",b.node.rad).classed("node",!0)},b.addSvgLine=function(a,b,c){return c.insert("line",":first-child").attr("x1",a.x).attr("y1",a.y).attr("x2",b.x).attr("y2",b.y).attr("class","line"),c},b.createSvgPolygon=function(c,d,e){var f,g={polyContainer:c.append("g").attr("data-ia-id",e.id),firstNode:void 0},h=(d.offsetWidth,d.offsetHeight,e.points),i={width:d.offsetWidth,height:d.offsetHeight};if(1===h.length){var j=a.deNormalize(i,h[0]);g.firstNode=g.polyContainer.append("circle").attr("cx",j.x).attr("cy",j.y).attr("r",1.5*b.node.rad).classed("node",!0)}var j,k;for(f=0;f<h.length-1;f+=1)j=a.deNormalize(i,h[f]),k=a.deNormalize(i,h[f+1]),g.polyContainer.append("line").attr("x1",j.x).attr("y1",j.y).attr("x2",k.x).attr("y2",k.y).attr("class","line"),0===f?g.firstNode=e.closed?g.polyContainer.append("circle").attr("cx",j.x).attr("cy",j.y).attr("r",b.node.rad).classed("node",!0):g.polyContainer.append("circle").attr("cx",j.x).attr("cy",j.y).attr("r",1.5*b.node.rad).classed("node",!0):g.polyContainer.append("circle").attr("cx",j.x).attr("cy",j.y).attr("r",b.node.rad).classed("node",!0);return!e.closed&&h.length>1&&g.polyContainer.append("circle").attr("cx",k.x).attr("cy",k.y).attr("r",b.node.rad).classed("node",!0),g},b}]),angular.module("image_annotator").run(["$templateCache",function(a){"use strict";a.put("templates/directive_template.html",'<button ng-click="open()">Open Modal!</button>'),a.put("templates/modal_template.html",'<div  ng-controller="toolbarController">\n    \n    <!--Toolbar Collapse Button-->\n    <div class="btn-group btn-group-sm pull-right">\n        <button type="button"\n                class="btn btn-default ia-collapse"\n                tooltip-append-to-body="true"\n                tooltip="Collapse Toolbar"\n                ng-click="onClickCollapse()">\n            <span class="{{buttonIcon.collapse}}"></span>\n        </button>\n    </div>\n\n    <!--Modal Header Collapsable-->\n    <div collapse="toolbarCollapse" class="modal-header">\n\n        <!--Toolbar-->\n        <div class="btn-toolbar ia-toolbar" role="toolbar">\n\n            <!--Operative Buttons-->\n            <div class="btn-group btn-group-sm">\n                <button type="button"\n                        class="btn btn-default ia-draw"\n                        tooltip-append-to-body="true"\n                        tooltip="Draw Polygon"\n                        ng-click="onClickDraw()">\n                    <span class="glyphicon glyphicon-pencil"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-default ia-pan"\n                        tooltip-append-to-body="true"\n                        tooltip="Pan Image"\n                        ng-click="onClickPan()">\n                    <span class="glyphicon glyphicon-move"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-default ia-select"\n                        tooltip-append-to-body="true"\n                        tooltip="Select Polygon"\n                        ng-click="onClickSelect()">\n                    <span class="glyphicon glyphicon-hand-up"></span>\n                </button>\n            </div>\n        \n            <!--Polygons Button-->\n            <div class="btn-group btn-group-sm">\n                <!--Add/Remove "button_disable" class to enter/exit in enable/disable mode-->\n                <button type="button"\n                        class="btn btn-default dropdown-toggle ia-polygons"\n                        tooltip-append-to-body="true"\n                        tooltip="Actions Menu">\n                    <span class="glyphicon glyphicon-unchecked"></span>\n                </button>\n                <ul class="dropdown-menu">\n                    <li>\n                        <a>Nome Poligono</a>\n                        <hr>\n                        <a ng-repeat="action in actions">{{action}}</a>\n                        <hr>\n                        <a>Bring to front</a>\n                        <a>Send to Back</a>\n                    </li>\n                </ul>\n            </div>\n        \n            <!--Undo/Redo Buttons-->\n            <div class="btn-group btn-group-sm">\n                <button type="button"\n                        class="btn btn-default ia-undo"\n                        tooltip-append-to-body="true"\n                        tooltip="Undo"\n                        ng-click="onClickUndo()">\n                    <span class="glyphicon glyphicon-step-backward"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-default ia-redo"\n                        tooltip-append-to-body="true"\n                        tooltip="Redo"\n                        ng-click="onClickRedo()">\n                    <span class="glyphicon glyphicon-step-forward"></span>\n                </button>\n            </div>\n        \n            <!--Fullscreen and PolygonList Buttons-->\n            <div class="btn-group btn-group-sm pull-right">\n                <button type="button"\n                        class="btn btn-default ia-fullscreen"\n                        tooltip-append-to-body="true"\n                        tooltip="FullScreen"\n                        ng-click="onClickFullScreen()">\n                    <span class="{{buttonIcon.fullScreen}}"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-default ia-polygons-list"\n                        tooltip-append-to-body="true"\n                        tooltip="Polygon List">\n                    <span class="glyphicon glyphicon-list"></span>\n                </button>\n            </div>\n        \n            <!--Zoom Buttons-->\n            <div class="btn-group btn-group-sm pull-right">\n                <button type="button"\n                        class="btn btn-default ia-zoom-in"\n                        tooltip-append-to-body="true"\n                        tooltip="Zoom In"\n                        ng-click="onClickZoomIn()">\n                    <span class="glyphicon glyphicon-zoom-in"></span>\n                </button>\n                <button type="button"\n                        class="btn btn-default ia-zoom-out"\n                        tooltip-append-to-body="true"\n                        tooltip="Zoom Out"\n                        ng-click="onClickZoomOut()">\n                    <span class="glyphicon glyphicon-zoom-out"></span>\n                </button>\n            </div>            \n\n        </div><!--/Toolbar-->\n\n    </div><!--/Modal Header-->\n\n</div><!--/div Toolbar Controller-->\n\n\n<div class="modal-body">\n    <!--Plugin Container-->\n    <div class="mask">\n\n        <!--Image and Polygon Container-->\n        <div class="world"\n        ng-mouseenter="mouseenterWorld()"\n        ng-mouseleave="mouseleaveWorld()"\n        ng-dblclick="dbclickWorld($event)"\n        ng-mousedown="mousedownWorld($event)"\n        ng-mouseup="mouseupWorld()"\n        ng-mousemove="mousemoveWorld($event)"\n        ng-click="clickWorld()">\n            <!--Polygon-->\n            <svg id="main-svg" ng-controller="svgController"></svg>\n            <!--Image-->\n            \n            <img id="main-img" src="{{conf.img}}">\n        </div><!--/World-->\n\n    </div><!--/Mask-->\n\n</div><!--/Modal Body-->\n\n<div class="modal-footer"></div>')}]);