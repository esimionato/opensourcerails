(function($){var Num=function(i){return parseInt(i,10)||0;};var asNum=function(a,b){return a-b;};var getMin=function(a){var b=a.concat();return b.sort(asNum)[0];};var getBorderWidth=function(elm,p){var w=elm.css("border"+p+"Width");if($.browser.msie){if(w=="thin"){w=2;}if(w=="medium"&&!(elm.css("border"+p+"Style")=="none")){w=4;}if(w=="thick"){w=6;}}return Num(w);};var rotationSteps=function(r_type,a,b,c,d){if(r_type=="tl"){return a;}if(r_type=="tr"){return b;}if(r_type=="bl"){return c;}if(r_type=="br"){return d;}};var drawCorner=function(canvas,radius,r_type,bg_color,border_width,border_color,corner_effect){var steps,curve_to;var reg=/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;var bits=reg.exec(bg_color);if(bits){var channels=[Num(bits[1]),Num(bits[2]),Num(bits[3])];bg_color="rgb("+channels[0]+", "+channels[1]+", "+channels[2]+")";}border_width=Num(border_width);var ctx=canvas.getContext("2d");if(radius==1||corner_effect=="notch"){if(border_width>0&&radius>1){ctx.fillStyle=border_color;ctx.fillRect(0,0,radius,radius);ctx.fillStyle=bg_color;steps=rotationSteps(r_type,[0-border_width,0-border_width],[border_width,0-border_width],[0-border_width,border_width],[border_width,border_width]);ctx.fillRect(steps[0],steps[1],radius,radius);}else{ctx.fillStyle=bg_color;ctx.fillRect(0,0,radius,radius);}return canvas;}else{if(corner_effect=="bevel"){steps=rotationSteps(r_type,[0,0,0,radius,radius,0,0,0],[0,0,radius,radius,radius,0,0,0],[0,0,radius,radius,0,radius,0,0],[radius,radius,radius,0,0,radius,radius,radius]);ctx.fillStyle=bg_color;ctx.beginPath();ctx.moveTo(steps[0],steps[1]);ctx.lineTo(steps[2],steps[3]);ctx.lineTo(steps[4],steps[5]);ctx.lineTo(steps[6],steps[7]);ctx.fill();if(border_width>0&&border_width<radius){ctx.strokeStyle=border_color;ctx.lineWidth=border_width;ctx.beginPath();steps=rotationSteps(r_type,[0,radius,radius,0],[0,0,radius,radius],[radius,radius,0,0],[0,radius,radius,0]);ctx.moveTo(steps[0],steps[1]);ctx.lineTo(steps[2],steps[3]);ctx.stroke();}return canvas;}}steps=rotationSteps(r_type,[0,0,radius,0,radius,0,0,radius,0,0],[radius,0,radius,radius,radius,0,0,0,0,0],[0,radius,radius,radius,0,radius,0,0,0,radius],[radius,radius,radius,0,radius,0,0,radius,radius,radius]);ctx.fillStyle=bg_color;ctx.beginPath();ctx.moveTo(steps[0],steps[1]);ctx.lineTo(steps[2],steps[3]);if(r_type=="br"){ctx.bezierCurveTo(steps[4],steps[5],radius,radius,steps[6],steps[7]);}else{ctx.bezierCurveTo(steps[4],steps[5],0,0,steps[6],steps[7]);}ctx.lineTo(steps[8],steps[9]);ctx.fill();if(border_width>0&&border_width<radius){var offset=border_width/2;steps=rotationSteps(r_type,[radius-offset,offset,radius-offset,offset,offset,radius-offset],[radius-offset,radius-offset,radius-offset,offset,offset,offset],[radius-offset,radius-offset,offset,radius-offset,offset,offset,offset,radius-offset],[radius-offset,offset,radius-offset,offset,offset,radius-offset,radius-offset,radius-offset]);curve_to=rotationSteps(r_type,[0,0],[0,0],[0,0],[radius,radius]);ctx.strokeStyle=border_color;ctx.lineWidth=border_width;ctx.beginPath();ctx.moveTo(steps[0],steps[1]);ctx.bezierCurveTo(steps[2],steps[3],curve_to[0],curve_to[1],steps[4],steps[5]);ctx.stroke();}return canvas;};var createCanvas=function(p,radius){var elm=document.createElement("canvas");elm.setAttribute("height",radius);elm.setAttribute("width",radius);elm.style.display="block";elm.style.position="absolute";elm.className="jrCorner";appendToParent(p,elm);if(!can_sp){if(typeof G_vmlCanvasManager=="object"){elm=G_vmlCanvasManager.initElement(elm);}else{if(typeof G_vmlCMjrc=="object"){elm=G_vmlCMjrc.i(elm);}else{throw Error("Could not find excanvas");}}}return elm;};var appendToParent=function(p,elm){if(p.is("table")){p.children("tbody").children("tr:first").children("td:first").append(elm);p.css("display","block");}else{if(p.is("td")){if(p.children(".JrcTdContainer").length===0){p.html('<div class="JrcTdContainer" style="padding:0px;position:relative;margin:-1px;zoom:1;">'+p.html()+"</div>");p.css("zoom","1");if($.browser.msie&&typeof document.body.style.maxHeight=="undefined"){p.children(".JrcTdContainer").get(0).style.setExpression("height","this.parentNode.offsetHeight");}}p.children(".JrcTdContainer").append(elm);}else{p.append(elm);}}};var can_sp=typeof document.createElement("canvas").getContext=="function";var _corner=function(options){if(options=="destroy"){return this.each(function(){var p,elm=$(this);if(elm.is(".jrcRounded")){if(elm.is("table")){p=elm.children("tbody").children("tr:first").children("td:first");}else{if(elm.is("td")){p=elm.children(".JrcTdContainer");}else{p=elm;}}p.children(".jrCorner").remove();elm.unbind("mouseleave.jrc").unbind("mouseenter.jrc").removeClass("jrcRounded");if(elm.is("td")){elm.html(elm.children(".JrcTdContainer").html());}}});}if(this.length==0||!(can_sp||$.browser.msie)){return this;}var o=(options||"").toLowerCase();var radius=Num((o.match(/(\d+)px/)||[])[1])||"auto";var bg_arg=((o.match(/(#[0-9a-f]+)/)||[])[1])||"auto";var re=/round|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dog/;var fx=((o.match(re)||["round"])[0]);var hover=/hover/.test(o);var hiddenparent_arg=o.match("hiddenparent");var edges={T:0,B:1};var opts={tl:/top|tl/.test(o),tr:/top|tr/.test(o),bl:/bottom|bl/.test(o),br:/bottom|br/.test(o)};if(!opts.tl&&!opts.tr&&!opts.bl&&!opts.br){opts={tl:1,tr:1,bl:1,br:1};}var arl=this.length;var argl=arguments.length;var cb=arguments[1];var al=this;return this.each(function(ll){var elm=$(this),rbg=null,bg,s,b,pr;if(bg_arg=="auto"){s=elm.siblings(".jrcRounded:eq(0)");if(s.length>0){b=s.data("rbg.jrc");if(typeof b=="string"){rbg=b;}}}if(hiddenparent_arg||rbg===null){var current_p=elm.parent(),hidden_parents=new Array(),a=0;while((typeof current_p=="object")&&!current_p.is("html")){if(hiddenparent_arg&&current_p.css("display")=="none"){hidden_parents.push({originalcss:{display:current_p.css("display"),visibility:current_p.css("visibility")},elm:current_p});current_p.css({display:"block",visibility:"hidden"});}if(rbg===null&&current_p.css("background-color")!="transparent"&&current_p.css("background-color")!="rgba(0, 0, 0, 0)"){rbg=current_p.css("background-color");}current_p=current_p.parent();}if(rbg===null){rbg="#ffffff";}}if(bg_arg=="auto"){bg=rbg;elm.data("rbg.jrc",rbg);}else{bg=bg_arg;}if(hover){var new_options=options.replace(/hover/i,"");elm.bind("mouseenter.jrc",function(){elm.addClass("jrcHover");elm.corner(new_options);});elm.bind("mouseleave.jrc",function(){elm.removeClass("jrcHover");elm.corner(new_options);});}if($.browser.msie&&typeof document.body.style.maxHeight=="undefined"){if(elm.css("display")=="inline"){elm.css("zoom","1");}if(elm.css("height")=="auto"){elm.height(elm.height());}if(elm.width()%2!=0){elm.width(elm.width()+1);}if(elm.height()%2!=0){elm.height(elm.height()+1);}if(elm.css("lineHeight")!="normal"&&elm.height()<elm.css("lineHeight")){elm.css("lineHeight",elm.height());}if(elm.css("lineHeight")=="normal"&&elm.css("display")!="inline"){elm.css("lineHeight","1");}}if(elm.css("display")=="none"){var originalvisibility=elm.css("visibility");elm.css({display:"block",visibility:"hidden"});var ishidden=true;}else{var ishiddden=false;}var arr=[elm.get(0).offsetHeight,elm.get(0).offsetWidth];if(elm.height()!=0){arr[arr.length]=elm.height();}if(elm.width()!=0){arr[arr.length]=elm.width();}var widthheight_smallest=getMin(arr);if(ishidden){elm.css({display:"none",visibility:originalvisibility});}if(typeof hidden_parents!="undefined"){for(var i=0;i<hidden_parents.length;i++){hidden_parents[i].elm.css(hidden_parents[i].originalcss);}}if(radius=="auto"){radius=widthheight_smallest/2;if(radius>10){radius=10;}}if(radius>widthheight_smallest/2){radius=widthheight_smallest/2;}radius=Math.floor(radius);if(elm.css("position")=="static"&&!elm.is("td")){elm.css("position","relative");}else{if(elm.css("position")=="fixed"&&$.browser.msie&&!(document.compatMode=="CSS1Compat"&&typeof document.body.style.maxHeight!="undefined")){elm.css("position","absolute");}}elm.css("overflow","visible");var border_t=getBorderWidth(elm,"Top");var border_r=getBorderWidth(elm,"Right");var border_b=getBorderWidth(elm,"Bottom");var border_l=getBorderWidth(elm,"Left");var bordersWidth=new Array();if(opts.tl||opts.tr){bordersWidth.push(border_t);}if(opts.br||opts.tr){bordersWidth.push(border_r);}if(opts.br||opts.bl){bordersWidth.push(border_b);}if(opts.bl||opts.tl){bordersWidth.push(border_l);}var borderswidth_smallest=getMin(bordersWidth);var p_top=0-border_t;var p_right=0-border_r;var p_bottom=0-border_b;var p_left=0-border_l;if(elm.is("table")){pr=elm.children("tbody").children("tr:first").children("td:first");}else{if(elm.is("td")){pr=elm.children(".JrcTdContainer");}else{pr=elm;}}if(opts.tl){pr.children(".jrcTL").remove();var tl=drawCorner(createCanvas(elm,radius),radius,"tl",bg,borderswidth_smallest,elm.css("borderTopColor"),fx);$(tl).css({left:p_left,top:p_top}).addClass("jrcTL");}if(opts.tr){pr.children(".jrcTR").remove();var tr=drawCorner(createCanvas(elm,radius),radius,"tr",bg,borderswidth_smallest,elm.css("borderTopColor"),fx);$(tr).css({right:p_right,top:p_top}).addClass("jrcTR");}if(opts.bl){pr.children(".jrcBL").remove();var bl=drawCorner(createCanvas(elm,radius),radius,"bl",bg,borderswidth_smallest,elm.css("borderBottomColor"),fx);$(bl).css({left:p_left,bottom:p_bottom}).addClass("jrcBL");}if(opts.br){pr.children(".jrcBR").remove();var br=drawCorner(createCanvas(elm,radius),radius,"br",bg,borderswidth_smallest,elm.css("borderBottomColor"),fx);$(br).css({right:p_right,bottom:p_bottom}).addClass("jrcBR");}elm.addClass("jrcRounded");if(ll===arl-1&&argl==2&&typeof cb=="function"){cb(al);}});};$.fn.corner=_corner;})(jQuery);jQuery(document).ready(function(){refreshHeights();});function refreshHeights(){var max_height=0;jQuery(".equal-heights").css("height","");jQuery(".equal-heights").each(function(){height=jQuery(this).height();if(height>max_height){max_height=height;}});jQuery(".equal-heights").each(function(){jQuery(this).height(max_height);});}(function($){$.fn.example=function(text,args){var options=$.extend({},$.fn.example.defaults,args);var callback=$.isFunction(text);if(!$.fn.example.bound_class_names[options.class_name]){$(window).unload(function(){$("."+options.class_name).val("");});$("form").submit(function(){$(this).find("."+options.class_name).val("");});$.fn.example.bound_class_names[options.class_name]=true;}return this.each(function(){var $this=$(this);if($this.val()==""){$this.addClass(options.class_name);$this.val(callback?text.call(this):text);}if(options.hide_label){var label=$("label[@for="+$this.attr("id")+"]");label.next("br").hide();label.hide();}$this.focus(function(){if($(this).is("."+options.class_name)){$(this).val("");$(this).removeClass(options.class_name);}});$this.blur(function(){if($(this).val()==""){$(this).addClass(options.class_name);$(this).val(callback?text.call(this):text);}});});};$.fn.example.defaults={class_name:"hint",hide_label:false};$.fn.example.bound_class_names=[];})(jQuery);(function($){$.fn.ajaxSubmit=function(options){if(typeof options=="function"){options={success:options};}options=$.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},options||{});var veto={};this.trigger("form-pre-serialize",[this,options,veto]);if(veto.veto){return this;}var a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;for(var n in options.data){a.push({name:n,value:options.data[n]});}}if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){return this;}this.trigger("form-submit-validate",[a,this,options,veto]);if(veto.veto){return this;}var q=$.param(a);if(options.type.toUpperCase()=="GET"){options.url+=(options.url.indexOf("?")>=0?"&":"?")+q;options.data=null;}else{options.data=q;}var $form=this,callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}if(options.clearForm){callbacks.push(function(){$form.clearForm();});}if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){$(options.target).html(data).each(oldSuccess,arguments);});}else{if(options.success){callbacks.push(options.success);}}options.success=function(data,status){for(var i=0,max=callbacks.length;i<max;i++){callbacks[i](data,status,$form);}};var files=$("input:file",this).fieldValue();var found=false;for(var j=0;j<files.length;j++){if(files[j]){found=true;}}if(options.iframe||found){if($.browser.safari&&options.closeKeepAlive){$.get(options.closeKeepAlive,fileUpload);}else{fileUpload();}}else{$.ajax(options);}this.trigger("form-submit-notify",[this,options]);return this;function fileUpload(){var form=$form[0];var opts=$.extend({},$.ajaxSettings,options);var id="jqFormIO"+(new Date().getTime());var $io=$('<iframe id="'+id+'" name="'+id+'" />');var io=$io[0];var op8=$.browser.opera&&window.opera.version()<9;if($.browser.msie||op8){io.src='javascript:false;document.write("");';}$io.css({position:"absolute",top:"-1000px",left:"-1000px"});var xhr={responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){}};var g=opts.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}if(g){$.event.trigger("ajaxSend",[xhr,opts]);}var cbInvoked=0;var timedOut=0;setTimeout(function(){var t=$form.attr("target"),a=$form.attr("action");$form.attr({target:id,encoding:"multipart/form-data",enctype:"multipart/form-data",method:"POST",action:opts.url});if(opts.timeout){setTimeout(function(){timedOut=true;cb();},opts.timeout);}var extraInputs=[];try{if(options.extraData){for(var n in options.extraData){extraInputs.push($('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />').appendTo(form)[0]);}}$io.appendTo("body");io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,false);form.submit();}finally{$form.attr("action",a);t?$form.attr("target",t):$form.removeAttr("target");$(extraInputs).remove();}},10);function cb(){if(cbInvoked++){return ;}io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,false);var ok=true;try{if(timedOut){throw"timeout";}var data,doc;doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;xhr.responseText=doc.body?doc.body.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;xhr.getResponseHeader=function(header){var headers={"content-type":opts.dataType};return headers[header];};if(opts.dataType=="json"||opts.dataType=="script"){var ta=doc.getElementsByTagName("textarea")[0];xhr.responseText=ta?ta.value:xhr.responseText;}else{if(opts.dataType=="xml"&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}}data=$.httpData(xhr,opts.dataType);}catch(e){ok=false;$.handleError(opts,xhr,"error",e);}if(ok){opts.success(data,"success");if(g){$.event.trigger("ajaxSuccess",[xhr,opts]);}}if(g){$.event.trigger("ajaxComplete",[xhr,opts]);}if(g&&!--$.active){$.event.trigger("ajaxStop");}if(opts.complete){opts.complete(xhr,ok?"success":"error");}setTimeout(function(){$io.remove();xhr.responseXML=null;},100);}function toXml(s,doc){if(window.ActiveXObject){doc=new ActiveXObject("Microsoft.XMLDOM");doc.async="false";doc.loadXML(s);}else{doc=(new DOMParser()).parseFromString(s,"text/xml");}return(doc&&doc.documentElement&&doc.documentElement.tagName!="parsererror")?doc:null;}}};$.fn.ajaxForm=function(options){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){$(this).ajaxSubmit(options);return false;}).each(function(){$(":submit,input:image",this).bind("click.form-plugin",function(e){var $form=this.form;$form.clk=this;if(this.type=="image"){if(e.offsetX!=undefined){$form.clk_x=e.offsetX;$form.clk_y=e.offsetY;}else{if(typeof $.fn.offset=="function"){var offset=$(this).offset();$form.clk_x=e.pageX-offset.left;$form.clk_y=e.pageY-offset.top;}else{$form.clk_x=e.pageX-this.offsetLeft;$form.clk_y=e.pageY-this.offsetTop;}}}setTimeout(function(){$form.clk=$form.clk_x=$form.clk_y=null;},10);});});};$.fn.ajaxFormUnbind=function(){this.unbind("submit.form-plugin");return this.each(function(){$(":submit,input:image",this).unbind("click.form-plugin");});};$.fn.formToArray=function(semantic){var a=[];if(this.length==0){return a;}var form=this[0];var els=semantic?form.getElementsByTagName("*"):form.elements;if(!els){return a;}for(var i=0,max=els.length;i<max;i++){var el=els[i];var n=el.name;if(!n){continue;}if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});}continue;}var v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(var j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}else{if(v!==null&&typeof v!="undefined"){a.push({name:n,value:v});}}}if(!semantic&&form.clk){var inputs=form.getElementsByTagName("input");for(var i=0,max=inputs.length;i<max;i++){var input=inputs[i];var n=input.name;if(n&&!input.disabled&&input.type=="image"&&form.clk==input){a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});}}}return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return ;}var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}else{if(v!==null&&typeof v!="undefined"){a.push({name:this.name,value:v});}}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){continue;}v.constructor==Array?$.merge(val,v):val.push(v);}return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(typeof successful=="undefined"){successful=true;}if(successful&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){return null;}if(tag=="select"){var index=el.selectedIndex;if(index<0){return null;}var a=[],ops=el.options;var one=(t=="select-one");var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=$.browser.msie&&!(op.attributes["value"].specified)?op.text:op.value;if(one){return v;}a.push(v);}}return a;}return el.value;};$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(t=="text"||t=="password"||tag=="textarea"){this.value="";}else{if(t=="checkbox"||t=="radio"){this.checked=false;}else{if(tag=="select"){this.selectedIndex=-1;}}}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b==undefined){b=true;}return this.each(function(){this.disabled=!b;});};$.fn.select=function(select){if(select==undefined){select=true;}return this.each(function(){var t=this.type;if(t=="checkbox"||t=="radio"){this.checked=select;}else{if(this.tagName.toLowerCase()=="option"){var $sel=$(this).parent("select");if(select&&$sel[0]&&$sel[0].type=="select-one"){$sel.find("option").select(false);}this.selected=select;}}});};})(jQuery);(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);(function($){$.extend($.fn,{livequery:function(type,fn,fn2){var self=this,q;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&type==query.type&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)){return(q=query)&&false;}});q=q||new $.livequery(this.selector,this.context,type,fn,fn2);q.stopped=false;$.livequery.run(q.id);return this;},expire:function(type,fn,fn2){var self=this;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&(!type||type==query.type)&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)&&!this.stopped){$.livequery.stop(query.id);}});return this;}});$.livequery=function(selector,context,type,fn,fn2){this.selector=selector;this.context=context||document;this.type=type;this.fn=fn;this.fn2=fn2;this.elements=[];this.stopped=false;this.id=$.livequery.queries.push(this)-1;fn.$lqguid=fn.$lqguid||$.livequery.guid++;if(fn2){fn2.$lqguid=fn2.$lqguid||$.livequery.guid++;}return this;};$.livequery.prototype={stop:function(){var query=this;if(this.type){this.elements.unbind(this.type,this.fn);}else{if(this.fn2){this.elements.each(function(i,el){query.fn2.apply(el);});}}this.elements=[];this.stopped=true;},run:function(){if(this.stopped){return ;}var query=this;var oEls=this.elements,els=$(this.selector,this.context),nEls=els.not(oEls);this.elements=els;if(this.type){nEls.bind(this.type,this.fn);if(oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){$.event.remove(el,query.type,query.fn);}});}}else{nEls.each(function(){query.fn.apply(this);});if(this.fn2&&oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){query.fn2.apply(el);}});}}}};$.extend($.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if($.livequery.running&&$.livequery.queue.length){var length=$.livequery.queue.length;while(length--){$.livequery.queries[$.livequery.queue.shift()].run();}}},pause:function(){$.livequery.running=false;},play:function(){$.livequery.running=true;$.livequery.run();},registerPlugin:function(){$.each(arguments,function(i,n){if(!$.fn[n]){return ;}var old=$.fn[n];$.fn[n]=function(){var r=old.apply(this,arguments);$.livequery.run();return r;};});},run:function(id){if(id!=undefined){if($.inArray(id,$.livequery.queue)<0){$.livequery.queue.push(id);}}else{$.each($.livequery.queries,function(id){if($.inArray(id,$.livequery.queue)<0){$.livequery.queue.push(id);}});}if($.livequery.timeout){clearTimeout($.livequery.timeout);}$.livequery.timeout=setTimeout($.livequery.checkQueue,20);},stop:function(id){if(id!=undefined){$.livequery.queries[id].stop();}else{$.each($.livequery.queries,function(id){$.livequery.queries[id].stop();});}}});$.livequery.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove");$(function(){$.livequery.play();});var init=$.prototype.init;$.prototype.init=function(a,c){var r=init.apply(this,arguments);if(a&&a.selector){r.context=a.context,r.selector=a.selector;}if(typeof a=="string"){r.context=c||document,r.selector=a;}return r;};$.prototype.init.prototype=$.prototype;})(jQuery);jQuery.fn.onPage=function(){return this.size()>0;};jQuery.fn.notOnPage=function(){return !this.onPage();};jQuery.ajaxSetup({beforeSend:function(xhr){xhr.setRequestHeader("Accept","text/javascript");}});(function($){$.ui=$.ui||{};$.fn.tabs=function(){var method=typeof arguments[0]=="string"&&arguments[0];var args=method&&Array.prototype.slice.call(arguments,1)||arguments;return method=="length"?$.data(this[0],"tabs").$tabs.length:this.each(function(){if(method){var tabs=$.data(this,"tabs");if(tabs){tabs[method].apply(tabs,args);}}else{new $.ui.tabs(this,args[0]||{});}});};$.ui.tabs=function(el,options){var self=this;this.options=$.extend({},$.ui.tabs.defaults,options);this.element=el;if(options.selected===null){this.options.selected=null;}this.options.event+=".tabs";$(el).bind("setData.tabs",function(event,key,value){if((/^selected/).test(key)){self.select(value);}else{self.options[key]=value;self.tabify();}}).bind("getData.tabs",function(event,key){return self.options[key];});$.data(el,"tabs",this);this.tabify(true);};$.ui.tabs.defaults={selected:0,unselect:false,event:"click",disabled:[],cookie:null,spinner:"Loading&#8230;",cache:false,idPrefix:"ui-tabs-",ajaxOptions:{},fx:null,tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:"<div></div>",navClass:"ui-tabs-nav",selectedClass:"ui-tabs-selected",unselectClass:"ui-tabs-unselect",disabledClass:"ui-tabs-disabled",panelClass:"ui-tabs-panel",hideClass:"ui-tabs-hide",loadingClass:"ui-tabs-loading"};$.extend($.ui.tabs.prototype,{tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+$.data(a);},ui:function(tab,panel){return{instance:this,options:this.options,tab:tab,panel:panel};},tabify:function(init){this.$lis=$("li:has(a[href])",this.element);this.$tabs=this.$lis.map(function(){return $("a",this)[0];});this.$panels=$([]);var self=this,o=this.options;this.$tabs.each(function(i,a){if(a.hash&&a.hash.replace("#","")){self.$panels=self.$panels.add(a.hash);}else{if($(a).attr("href")!="#"){$.data(a,"href.tabs",a.href);$.data(a,"load.tabs",a.href);var id=self.tabId(a);a.href="#"+id;var $panel=$("#"+id);if(!$panel.length){$panel=$(o.panelTemplate).attr("id",id).addClass(o.panelClass).insertAfter(self.$panels[i-1]||self.element);$panel.data("destroy.tabs",true);}self.$panels=self.$panels.add($panel);}else{o.disabled.push(i+1);}}});if(init){$(this.element).hasClass(o.navClass)||$(this.element).addClass(o.navClass);this.$panels.each(function(){var $this=$(this);$this.hasClass(o.panelClass)||$this.addClass(o.panelClass);});this.$tabs.each(function(i,a){if(location.hash){if(a.hash==location.hash){o.selected=i;if($.browser.msie||$.browser.opera){var $toShow=$(location.hash),toShowId=$toShow.attr("id");$toShow.attr("id","");setTimeout(function(){$toShow.attr("id",toShowId);},500);}scrollTo(0,0);return false;}}else{if(o.cookie){var index=parseInt($.cookie("ui-tabs"+$.data(self.element)),10);if(index&&self.$tabs[index]){o.selected=index;return false;}}else{if(self.$lis.eq(i).hasClass(o.selectedClass)){o.selected=i;return false;}}}});this.$panels.addClass(o.hideClass);this.$lis.removeClass(o.selectedClass);if(o.selected!==null){this.$panels.eq(o.selected).show().removeClass(o.hideClass);this.$lis.eq(o.selected).addClass(o.selectedClass);}var href=o.selected!==null&&$.data(this.$tabs[o.selected],"load.tabs");if(href){this.load(o.selected);}o.disabled=$.unique(o.disabled.concat($.map(this.$lis.filter("."+o.disabledClass),function(n,i){return self.$lis.index(n);}))).sort();$(window).bind("unload",function(){self.$tabs.unbind(".tabs");self.$lis=self.$tabs=self.$panels=null;});}for(var i=0,li;li=this.$lis[i];i++){$(li)[$.inArray(i,o.disabled)!=-1&&!$(li).hasClass(o.selectedClass)?"addClass":"removeClass"](o.disabledClass);}if(o.cache===false){this.$tabs.removeData("cache.tabs");}var hideFx,showFx,baseFx={"min-width":0,duration:1},baseDuration="normal";if(o.fx&&o.fx.constructor==Array){hideFx=o.fx[0]||baseFx,showFx=o.fx[1]||baseFx;}else{hideFx=showFx=o.fx||baseFx;}var resetCSS={display:"",overflow:"",height:""};if(!$.browser.msie){resetCSS.opacity="";}function hideTab(clicked,$hide,$show){$hide.animate(hideFx,hideFx.duration||baseDuration,function(){$hide.addClass(o.hideClass).css(resetCSS);if($.browser.msie&&hideFx.opacity){$hide[0].style.filter="";}if($show){showTab(clicked,$show,$hide);}});}function showTab(clicked,$show,$hide){if(showFx===baseFx){$show.css("display","block");}$show.animate(showFx,showFx.duration||baseDuration,function(){$show.removeClass(o.hideClass).css(resetCSS);if($.browser.msie&&showFx.opacity){$show[0].style.filter="";}$(self.element).triggerHandler("tabsshow",[self.ui(clicked,$show[0])],o.show);});}function switchTab(clicked,$li,$hide,$show){$li.addClass(o.selectedClass).siblings().removeClass(o.selectedClass);hideTab(clicked,$hide,$show);}this.$tabs.unbind(".tabs").bind(o.event,function(){var $li=$(this).parents("li:eq(0)"),$hide=self.$panels.filter(":visible"),$show=$(this.hash);if(($li.hasClass(o.selectedClass)&&!o.unselect)||$li.hasClass(o.disabledClass)||$(this).hasClass(o.loadingClass)||$(self.element).triggerHandler("tabsselect",[self.ui(this,$show[0])],o.select)===false){this.blur();return false;}self.options.selected=self.$tabs.index(this);if(o.unselect){if($li.hasClass(o.selectedClass)){self.options.selected=null;$li.removeClass(o.selectedClass);self.$panels.stop();hideTab(this,$hide);this.blur();return false;}else{if(!$hide.length){self.$panels.stop();var a=this;self.load(self.$tabs.index(this),function(){$li.addClass(o.selectedClass).addClass(o.unselectClass);showTab(a,$show);});this.blur();return false;}}}if(o.cookie){$.cookie("ui-tabs"+$.data(self.element),self.options.selected,o.cookie);}self.$panels.stop();if($show.length){var a=this;self.load(self.$tabs.index(this),$hide.length?function(){switchTab(a,$li,$hide,$show);}:function(){$li.addClass(o.selectedClass);showTab(a,$show);});}else{throw"jQuery UI Tabs: Mismatching fragment identifier.";}if($.browser.msie){this.blur();}return false;});if(!(/^click/).test(o.event)){this.$tabs.bind("click.tabs",function(){return false;});}},add:function(url,label,index){if(index==undefined){index=this.$tabs.length;}var o=this.options;var $li=$(o.tabTemplate.replace(/#\{href\}/,url).replace(/#\{label\}/,label));$li.data("destroy.tabs",true);var id=url.indexOf("#")==0?url.replace("#",""):this.tabId($("a:first-child",$li)[0]);var $panel=$("#"+id);if(!$panel.length){$panel=$(o.panelTemplate).attr("id",id).addClass(o.panelClass).addClass(o.hideClass);$panel.data("destroy.tabs",true);}if(index>=this.$lis.length){$li.appendTo(this.element);$panel.appendTo(this.element.parentNode);}else{$li.insertBefore(this.$lis[index]);$panel.insertBefore(this.$panels[index]);}o.disabled=$.map(o.disabled,function(n,i){return n>=index?++n:n;});this.tabify();if(this.$tabs.length==1){$li.addClass(o.selectedClass);$panel.removeClass(o.hideClass);var href=$.data(this.$tabs[0],"load.tabs");if(href){this.load(index,href);}}$(this.element).triggerHandler("tabsadd",[this.ui(this.$tabs[index],this.$panels[index])],o.add);},remove:function(index){var o=this.options,$li=this.$lis.eq(index).remove(),$panel=this.$panels.eq(index).remove();if($li.hasClass(o.selectedClass)&&this.$tabs.length>1){this.select(index+(index+1<this.$tabs.length?1:-1));}o.disabled=$.map($.grep(o.disabled,function(n,i){return n!=index;}),function(n,i){return n>=index?--n:n;});this.tabify();$(this.element).triggerHandler("tabsremove",[this.ui($li.find("a")[0],$panel[0])],o.remove);},enable:function(index){var o=this.options;if($.inArray(index,o.disabled)==-1){return ;}var $li=this.$lis.eq(index).removeClass(o.disabledClass);if($.browser.safari){$li.css("display","inline-block");setTimeout(function(){$li.css("display","block");},0);}o.disabled=$.grep(o.disabled,function(n,i){return n!=index;});$(this.element).triggerHandler("tabsenable",[this.ui(this.$tabs[index],this.$panels[index])],o.enable);},disable:function(index){var self=this,o=this.options;if(index!=o.selected){this.$lis.eq(index).addClass(o.disabledClass);o.disabled.push(index);o.disabled.sort();$(this.element).triggerHandler("tabsdisable",[this.ui(this.$tabs[index],this.$panels[index])],o.disable);}},select:function(index){if(typeof index=="string"){index=this.$tabs.index(this.$tabs.filter("[href$="+index+"]")[0]);}this.$tabs.eq(index).trigger(this.options.event);},load:function(index,callback){var self=this,o=this.options,$a=this.$tabs.eq(index),a=$a[0],bypassCache=callback==undefined||callback===false,url=$a.data("load.tabs");callback=callback||function(){};if(!url||($.data(a,"cache.tabs")&&!bypassCache)){callback();return ;}if(o.spinner){var $span=$("span",a);$span.data("label.tabs",$span.html()).html("<em>"+o.spinner+"</em>");}var finish=function(){self.$tabs.filter("."+o.loadingClass).each(function(){$(this).removeClass(o.loadingClass);if(o.spinner){var $span=$("span",this);$span.html($span.data("label.tabs")).removeData("label.tabs");}});self.xhr=null;};var ajaxOptions=$.extend({},o.ajaxOptions,{url:url,success:function(r,s){$(a.hash).html(r);finish();callback();if(o.cache){$.data(a,"cache.tabs",true);}$(self.element).triggerHandler("tabsload",[self.ui(self.$tabs[index],self.$panels[index])],o.load);o.ajaxOptions.success&&o.ajaxOptions.success(r,s);}});if(this.xhr){this.xhr.abort();finish();}$a.addClass(o.loadingClass);setTimeout(function(){self.xhr=$.ajax(ajaxOptions);},0);},url:function(index,url){this.$tabs.eq(index).removeData("cache.tabs").data("load.tabs",url);},destroy:function(){var o=this.options;$(this.element).unbind(".tabs").removeClass(o.navClass).removeData("tabs");this.$tabs.each(function(){var href=$.data(this,"href.tabs");if(href){this.href=href;}var $this=$(this).unbind(".tabs");$.each(["href","load","cache"],function(i,prefix){$this.removeData(prefix+".tabs");});});this.$lis.add(this.$panels).each(function(){if($.data(this,"destroy.tabs")){$(this).remove();}else{$(this).removeClass([o.selectedClass,o.unselectClass,o.disabledClass,o.panelClass,o.hideClass].join(" "));}});}});})(jQuery);