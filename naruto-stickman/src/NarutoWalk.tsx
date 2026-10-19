import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';

const Part: React.FC<{file:string;x:number;y:number;w:number;h:number;rotate?:number;origin?:string;z?:number}> =
({file,x,y,w,h,rotate=0,origin='50% 50%',z=1}) => <Img src={staticFile('parts/'+file)} style={{position:'absolute',left:x,top:y,width:w,height:h,objectFit:'fill',transform:'rotate('+rotate+'deg)',transformOrigin:origin,zIndex:z}} />;

export const NarutoWalk: React.FC = () => {
 const frame=useCurrentFrame();
 const cycle=(frame%30)/30;
 const leg=Math.sin(cycle*Math.PI*2)*24;
 const arm=Math.sin(cycle*Math.PI*2+Math.PI)*22;
 const bob=Math.abs(Math.sin(cycle*Math.PI*2))*10;
 const travel=interpolate(frame,[0,299],[0,260],{extrapolateRight:'clamp'});
 const cx=540-travel*.25, y=640+bob;
 return <AbsoluteFill style={{background:'#eaf3fa',overflow:'hidden',fontFamily:'Arial,sans-serif'}}>
  <AbsoluteFill style={{background:'linear-gradient(#cfe8fa 0%,#eef7ff 70%,#d7e7c7 70%,#d7e7c7 100%)'}} />
  <div style={{position:'absolute',left:0,right:0,top:y+470,height:5,background:'#6b795f'}} />
  <div style={{position:'absolute',left:0,right:0,top:y+474,height:500,background:'repeating-linear-gradient(90deg,#d5e5c6 0 90px,#c9ddb7 90px 180px)'}} />
  <div style={{position:'absolute',left:cx-110,top:y+420,width:220,height:28,borderRadius:'50%',background:'rgba(0,0,0,.15)'}} />
  <Part file="headband_tails.svg" x={cx-47} y={y-145} w={92} h={132} rotate={Math.sin(cycle*Math.PI*2)*8} origin="20% 5%" z={2}/>
  <Part file="leg.svg" x={cx-61} y={y+245} w={62} h={150} rotate={leg} origin="50% 4%" z={3}/>
  <Part file="leg.svg" x={cx+2} y={y+245} w={62} h={150} rotate={-leg} origin="50% 4%" z={2}/>
  <Part file="torso.svg" x={cx-73} y={y+90} w={146} h={178} rotate={Math.sin(cycle*Math.PI*2)*2} origin="50% 10%" z={4}/>
  <Part file="arm.svg" x={cx-105} y={y+115} w={58} h={142} rotate={arm} origin="65% 10%" z={5}/>
  <Part file="arm.svg" x={cx+47} y={y+115} w={58} h={142} rotate={-arm} origin="35% 10%" z={3}/>
  <Part file="head.svg" x={cx-83} y={y-65} w={166} h={166} z={6}/>
  <Part file="headband.svg" x={cx-91} y={y-75} w={182} h={90} z={7}/>
  <Part file="hair.svg" x={cx-98} y={y-113} w={196} h={100} z={8}/>
  <div style={{position:'absolute',top:110,left:0,right:0,textAlign:'center',color:'#24384b'}}><div style={{fontSize:54,fontWeight:800,letterSpacing:2}}>NARUTO</div><div style={{fontSize:26,marginTop:12}}>2D STICKMAN WALK CYCLE</div></div>
  <div style={{position:'absolute',bottom:90,left:0,right:0,textAlign:'center',color:'#334155',fontSize:24}}>Procedural animation · Remotion</div>
 </AbsoluteFill>;
};
