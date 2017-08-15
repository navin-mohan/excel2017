

export default class Ringer{
    constructor(options){
        this.countdown_to = options.countdown_to;
        // console.log("sata",options.countdown_to);        
        this.r_count = options.r_count || 4;
        this.r_spacing = options.r_spacing || 16;
        this.r_size = options.r_size || 100;
        this.r_thickness = options.r_thickness || 3;
        this.firstCircleStrokeStyle = options.firstCircleStrokeStyle || "rgba(200,0,244,0.5)";
        this.secondCircleStrokeStyle = options.secondCircleStrokeStyle || "rgba(200,0,255,1)";
        this.textFillStyle = options.textFillStyle || "#000000";
        this.rings = {
                'DAYS': { 
                s: 86400000, // mseconds in a day,
                max: 365
                },
                'HOURS': {
                s: 3600000, // mseconds per hour,
                max: 24
                },
                'MINUTES': {
                s: 60000, // mseconds per minute
                max: 60
                },
                'SECONDS': {
                s: 1000,
                max: 60
                }
            };
    }

    go(){
        var idx=0;
        this.time = (Date.now()) - this.countdown_to_time;
        // console.log("time",this.time);
        for(var r_key in this.rings) this.unit(idx++,r_key,this.rings[r_key]);
    }

    unit(idx,label,ring){
        var x,y, value, ring_secs = ring.s;
        value = parseFloat(this.time/ring_secs);
        this.time-=Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);
        
        x = (this.r_size*.5 + this.r_thickness*.5);
        x +=+(idx*(this.r_size+this.r_spacing+this.r_thickness));
        y = this.r_size*.5;
        y += this.r_thickness*.5;

        
        // calculate arc end angle
        var degrees = 360-(value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);
        
        this.ctx.save();

        this.ctx.translate(x,y);
        this.ctx.clearRect(this.actual_size*-0.5,this.actual_size*-0.5,this.actual_size,this.actual_size);

        // first circle
        this.ctx.strokeStyle = this.firstCircleStrokeStyle;
        this.ctx.beginPath();
        this.ctx.arc(0,0,this.r_size/2,0,20, 1);
        this.ctx.lineWidth =this.r_thickness;
        this.ctx.stroke();
    
        // second circle
        this.ctx.strokeStyle = this.secondCircleStrokeStyle;
        this.ctx.beginPath();
        this.ctx.arc(0,0,this.r_size/2,0,endAngle, 1);
        this.ctx.lineWidth =this.r_thickness;
        this.ctx.stroke();
        
        // label
        this.ctx.fillStyle = this.textFillStyle;
    
        this.ctx.font = '12px Helvetica';
        this.ctx.fillText(label, 0, 23);
        this.ctx.fillText(label, 0, 23);   
        
        this.ctx.font = 'bold 40px Helvetica';
        // console.log("unit",Math.floor(value));
        this.ctx.fillText(Math.floor(value), 0, 10);
        
        this.ctx.restore();
    }

    init(cvs){
        this.cvs = cvs;
        this.size = { 
            w: (this.r_size + this.r_thickness) * this.r_count + (this.r_spacing*(this.r_count-1)), 
            h: (this.r_size + this.r_thickness) 
        };
        
        this.cvs.setAttribute('width',this.size.w);           
        this.cvs.setAttribute('height',this.size.h);
        this.ctx = this.cvs.getContext('2d');
 
        this.ctx.textAlign = 'center';
        this.actual_size = this.r_size + this.r_thickness;
        this.countdown_to_time = new Date(this.countdown_to);
        // console.log("countdown to:",this.countdown_to_time);
        // this.cvs.css({ width: this.size.w+"px", height: this.size.h+"px" });
        this.cvs.style.width = this.size.w+"px";
        this.cvs.style.height = this.size.h+"px";
        this.go();
    }


}

// var ringer = {
//   countdown_to: "10/15/2017",
//   rings: {
//     'DAYS': { 
//       s: 86400000, // mseconds in a day,
//       max: 365
//     },
//     'HOURS': {
//       s: 3600000, // mseconds per hour,
//       max: 24
//     },
//     'MINUTES': {
//       s: 60000, // mseconds per minute
//       max: 60
//     },
//     'SECONDS': {
//       s: 1000,
//       max: 60
//     }
//    },
//   r_count: 4,
//   r_spacing: 16, // px
//   r_size: 100, // px
//   r_thickness: 3, // px
//   update_interval: 1000, // ms
    
    
//   init: function(){
   
//     r = ringer;
//     // r.cvs = document.createElement('canvas'); 
    
//     r.size = { 
//       w: (r.r_size + r.r_thickness) * r.r_count + (r.r_spacing*(r.r_count-1)), 
//       h: (r.r_size + r.r_thickness) 
//     };
    


//     r.cvs.setAttribute('width',r.size.w);           
//     r.cvs.setAttribute('height',r.size.h);
//     r.ctx = r.cvs.getContext('2d');
//     // $(document.body).append(r.cvs);
//     // r.cvs = $(r.cvs);    
//     r.ctx.textAlign = 'center';
//     r.actual_size = r.r_size + r.r_thickness;
//     r.countdown_to_time = new Date(r.countdown_to).getTime();
//     r.cvs.css({ width: r.size.w+"px", height: r.size.h+"px" });
//     r.go();
//   },
//   ctx: null,
//   go: function(r){
//     var idx=0;
    
//     r.time = (new Date().getTime()) - r.countdown_to_time;
    
    
//     for(var r_key in r.rings) r.unit(idx++,r_key,r.rings[r_key]);      
    
//     // setTimeout(r.go,r.update_interval);
//   },
//   unit: function(r,idx,label,ring) {
//     var x,y, value, ring_secs = ring.s;
//     value = parseFloat(r.time/ring_secs);
//     r.time-=Math.round(parseInt(value)) * ring_secs;
//     value = Math.abs(value);
    
//     x = (r.r_size*.5 + r.r_thickness*.5);
//     x +=+(idx*(r.r_size+r.r_spacing+r.r_thickness));
//     y = r.r_size*.5;
//     y += r.r_thickness*.5;

    
//     // calculate arc end angle
//     var degrees = 360-(value / ring.max) * 360.0;
//     var endAngle = degrees * (Math.PI / 180);
    
//     r.ctx.save();

//     r.ctx.translate(x,y);
//     r.ctx.clearRect(r.actual_size*-0.5,r.actual_size*-0.5,r.actual_size,r.actual_size);

//     // first circle
//     r.ctx.strokeStyle = "rgba(200,0,244,0.5)";
//     r.ctx.beginPath();
//     r.ctx.arc(0,0,r.r_size/2,0,20, 1);
//     r.ctx.lineWidth =r.r_thickness;
//     r.ctx.stroke();
   
//     // second circle
//     r.ctx.strokeStyle = "rgba(200,0,255,1)";
//     r.ctx.beginPath();
//     r.ctx.arc(0,0,r.r_size/2,0,endAngle, 1);
//     r.ctx.lineWidth =r.r_thickness;
//     r.ctx.stroke();
    
//     // label
//     r.ctx.fillStyle = "#ffffff";
   
//     r.ctx.font = '12px Helvetica';
//     r.ctx.fillText(label, 0, 23);
//     r.ctx.fillText(label, 0, 23);   
    
//     r.ctx.font = 'bold 40px Helvetica';
//     r.ctx.fillText(Math.floor(value), 0, 10);
    
//     r.ctx.restore();
//   }
// }

// // ringer.init();

// const getConfig = (countdown_to,cvs) => ({ ...ringer, countdown_to, cvs}); 

// const init = function(r){
   
//     // r = ringer;
//     // r.cvs = document.createElement('canvas'); 
    
//     r.size = { 
//       w: (r.r_size + r.r_thickness) * r.r_count + (r.r_spacing*(r.r_count-1)), 
//       h: (r.r_size + r.r_thickness) 
//     };
    


//     r.cvs.setAttribute('width',r.size.w);           
//     r.cvs.setAttribute('height',r.size.h);
//     r.ctx = r.cvs.getContext('2d');
//     // $(document.body).append(r.cvs);
//     // r.cvs = $(r.cvs);    
//     r.ctx.textAlign = 'center';
//     r.actual_size = r.r_size + r.r_thickness;
//     r.countdown_to_time = new Date(r.countdown_to).getTime();
//     r.cvs.css({ width: r.size.w+"px", height: r.size.h+"px" });
//     r.go();
//   };