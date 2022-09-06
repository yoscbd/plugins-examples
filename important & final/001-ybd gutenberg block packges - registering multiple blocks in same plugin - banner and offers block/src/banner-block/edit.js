
import './editor.scss';
import { __ } from '@wordpress/i18n';
import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import { ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';



/* import { useMedia } from '@10up/block-components'; */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function Edit(props) {
	useEffect(
		function () {
			if (props.attributes.imgID) {
				async function go() {
					const response = await apiFetch({
						path: `/wp/v2/media/${props.attributes.imgID}`,
						method: "GET"
					})
					props.setAttributes({ imgURL: response.media_details.sizes.full.source_url })
					console.log(response);
				}
				go()
			}
		},
		[props.attributes.imgID]
	)

	function onFileSelect(x) {
		props.setAttributes({ imgID: x.id })
	}
	function ybdChangeColor(x) {
		props.setAttributes({ banner_text_color: x })
	}
	function ybdChangeTitleColor(x) {
		props.setAttributes({ banner_title_color: x })
	}

	const { imageId } = 54;

	function handleImageSelect(image) {
		setAttributes({ imageId: image.id });
	}




	const blockProps = useBlockProps({
		className: 'section-first',
		style: { height: "auto" }
	});


	const textColor = '#fff'
	const textColors = [
		{ name: 'Theme Brown', color: '#D3854C' },
		{ name: 'Theme white', color: '#fff' },
		{ name: 'Theme Blue', color: '#2a7de1' }
	];




	/* 	const { media, hasResolvedMedia } = useMedia(props.attributes.imgID);
		console.log("media: ", media)
		console.log("media: ", media) */
	//console.log("media.source_url: ", media.source_url)
	return (

		<>



			<div>
				{props.attributes.imgID ? (

					<notice status="success">
						<p>
							We got the image ID.
						</p>
					</notice>
				) : (
					<notice status="success">
						<p>
							We DO NOT got the image ID
						</p>
					</notice>
				)}
			</div>

			{/* {!hasResolvedMedia &&
				<p>Loading...</p>

			}
			{hasResolvedMedia &&

				<img src={media.source_url} alt={media.alt} />
			} */}


			<InspectorControls>
				<PanelBody title="Background" initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}
								render={({ open }) => {
									return <Button onClick={open}>Choose Image</Button>
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Text Color" initialOpen={true}>
					<PanelRow>
						Title Color:
						<ColorPalette
							colors={textColors}
							value={textColor}
							onChange={ybdChangeTitleColor}

						/>
					</PanelRow>
					<PanelRow>
						Text Color:
						<ColorPalette
							colors={textColors}
							value={textColor}
							onChange={ybdChangeColor}

						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<section   {...blockProps}>





				<div>
					<div className="banner-title">

						<RichText
							//							className={`banner-main-title-color ${props.attributes.banner_title_color}`}
							style={{ color: props.attributes.banner_title_color }}
							tagName="h4"
							value={props.attributes.first_title} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ first_title: value })}
							placeholder={__('first heading...')} // Display this text before any content has been added by the user
						/>


					</div>
				</div>
				<div>
					<div className="banner-main-section">
						<div className="left">

							<RichText
								style={{ color: props.attributes.banner_text_color }}
								tagName="h3"
								value={props.attributes.main_title} // Any existing content, either from the database or an attribute default
								//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={(value) => props.setAttributes({ main_title: value })}
								placeholder={__('main title...')} // Display this text before any content has been added by the user
							/>

							<RichText
								style={{ color: props.attributes.banner_text_color }}
								tagName="p"
								value={props.attributes.main_text} // Any existing content, either from the database or an attribute default
								//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={(value) => props.setAttributes({ main_text: value })}
								placeholder={__('main text...')} // Display this text before any content has been added by the user
							/>
						</div>
						<div className="right">

							<img src={props.attributes.imgURL} alt="Main Banner Image" />


							{/* 			<LazyLoadImage
								alt="alt text"
								effect="blur"
								src={props.attributes.imgURL} /> */}


						</div>
					</div>
				</div>
				<div>
					<div className="banner-cta">
						{/*  <button type="button">Accelerate your compliance now</button> */}
						<RichText

							tagName="button"
							value={props.attributes.btn_text} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ btn_text: value })}
							placeholder={__('btn text...')} // Display this text before any content has been added by the user
						/>

					</div>
				</div>
			</section>
		</>
	)
}
