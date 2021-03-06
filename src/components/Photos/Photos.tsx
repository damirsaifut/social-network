import React from 'react';
import photos from './Photos.module.css';
import { NavLink } from 'react-router-dom';
import folder from '../../assets/img/folder.png';
import { Slide } from './Slide/Slide';
import { albomType } from '../../types/types';

type propsType = {
	viewParams: string | undefined	
	authId: number | null
	photos: Array<albomType>
	numberSlidePhoto: number
	allPhotos: Array<string>
	slide: Array<string>
	underSlidePhotos: Array<string>
	nextSlide: () => void
	prevSlide: () => void
	showSlide: (num: number) => void
}
export const Photos = (props: propsType) => {

	return (
		<div className = {photos.container}>
			{props.numberSlidePhoto >=0 && (props.viewParams === "all" || props.viewParams === undefined) && <Slide {...props}/>}
			
			<nav className = {photos.nav}>
				<span>Show as: </span>
				<NavLink 	to = {`/photos/all`} 
							activeClassName={photos.active} className = { props.viewParams === undefined ? photos.active : undefined}
							onClick = {() => props.showSlide(-1) }>all</NavLink>
				<NavLink 	to = {`/photos/slide`} 
							activeClassName={photos.active}
							onClick = {() => props.showSlide(0) }>slide</NavLink>
				<NavLink 	to = {`/photos/albom`} activeClassName={photos.active}>albom</NavLink>

				
			</nav>
			{props.viewParams === "slide" && 	
				<section className = {photos.sliderContainer}>
					<button className = {photos.arrow} onClick = {props.prevSlide} disabled = {props.numberSlidePhoto===0}>
						<svg className = {photos.arrowIcon} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"  height="30px" version="1.1" viewBox="0 0 9.34 15.06" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M0 7.26c0,0.53 -0.05,0.75 0.26,1.2 0.09,0.13 0.31,0.33 0.44,0.45l4.57 4.57c0.22,0.22 1.17,1.22 1.39,1.35 0.63,0.4 1.28,0.25 1.79,-0.23 0.04,-0.04 0.02,-0.02 0.06,-0.05 0.56,-0.5 0.83,-0.78 0.83,-1.53 0,-0.41 -0.19,-0.68 -0.41,-0.89 -0.45,-0.45 -4.46,-4.42 -4.57,-4.6 0.11,-0.17 4.11,-4.14 4.55,-4.58 0.36,-0.35 0.43,-0.6 0.43,-1.1 0,-0.57 -0.56,-1.15 -0.92,-1.44 -0.52,-0.4 -1.08,-0.58 -1.71,-0.21 -0.31,0.18 -2.93,2.87 -3.25,3.18l-3.19 3.2c-0.11,0.14 -0.27,0.44 -0.27,0.68z"/></svg>
					</button>
					<div className = {photos.slidePhoto} style = {{backgroundImage:`url(${process.env.PUBLIC_URL + props.slide})`}}></div>
					<button className = {photos.arrow} onClick = {props.nextSlide} disabled = {props.numberSlidePhoto===props.allPhotos.length-1}>
						<svg className = {photos.arrowIcon}  xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"height="30px" version="1.1" viewBox="0 0 8.31 13.41" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M8.31 6.46c0,0.47 0.05,0.67 -0.23,1.07 -0.08,0.12 -0.28,0.29 -0.39,0.4l-4.07 4.07c-0.2,0.2 -1.05,1.08 -1.24,1.2 -0.56,0.36 -1.14,0.22 -1.59,-0.2 -0.04,-0.04 -0.02,-0.02 -0.06,-0.05 -0.5,-0.44 -0.73,-0.69 -0.73,-1.36 0,-0.36 0.17,-0.61 0.36,-0.79 0.4,-0.4 3.97,-3.94 4.07,-4.1 -0.1,-0.15 -3.66,-3.68 -4.05,-4.07 -0.32,-0.31 -0.38,-0.54 -0.38,-0.99 0,-0.5 0.49,-1.02 0.82,-1.27 0.45,-0.36 0.96,-0.52 1.52,-0.19 0.27,0.16 2.61,2.55 2.89,2.83l2.84 2.85c0.1,0.12 0.24,0.39 0.24,0.6z"/></svg>		
					</button>
					<hr className = {photos.line}/>	
					<div className = {photos.photoWrapper}>
						{props.underSlidePhotos.map( item => <div 	className = {photos.underSlidePhoto} 
																	style = {{backgroundImage:`url(${process.env.PUBLIC_URL + item})`}}
																	key = {item}></div>)}
					</div>
				</section>}
			{props.viewParams === "albom" && props.photos.map((item, index) => 	<>
										<div className = {photos.albomHead} key = { index }>
																		<img src = {folder} alt="folder" width = "50px" />
																		<span  className = {photos.albomName}>{item.name}</span>
																		<hr className = {photos.line}/>
																	</div>
										<div className = {photos.photoWrapper}>
											{item.data.map(elem => 	<div 	className = {photos.item}
																			style = {{backgroundImage:`url(${process.env.PUBLIC_URL + elem})`}}
																			key = {elem}>
																	</div>)}	
										</div>
										</>)}
			{(props.viewParams === "all" || 
			 props.viewParams === undefined) && <div className = {photos.photoWrapper}>
												{props.allPhotos.map((item, index)=> (
													<div 	className = {photos.item}
															style = {{backgroundImage:`url(${process.env.PUBLIC_URL + item})`}}
															key = {index}
															onClick = {() => props.showSlide(index)}>
													</div>))}	
												</div>}
			
		</div>)
	
}
