import { __ } from '@wordpress/i18n';
import {
	useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck,
	__experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';
import { ColorPicker, Button, PanelBody, PanelRow, ColorPalette, TextControl, ExternalLink } from "@wordpress/components"
import { link, postFeaturedImage } from "@wordpress/icons"
import { useState, useEffect } from "@wordpress/element"




import { ChromePicker } from "react-color"; // if we use the chrom color picker insteat of wp-ColorPicker

import apiFetch from "@wordpress/api-fetch"
import './editor.scss';

export default function Edit(props) {

	function handleMainTitleChange(x) {
		props.setAttributes({ main_title: x })
	}
	function handle_sub_title_first_Change(x) {
		props.setAttributes({ sub_title_first: x })
	}
	function handle_sub_title_second_Change(x) {
		props.setAttributes({ sub_title_second: x })
	}
	function handleCtaTextChange(x) {
		props.setAttributes({ cta_text: x })
	}
	function handleCtaUrlChange(x) {
		props.setAttributes({ cta_url: x })
	}
	function onFileSelect(x) {
		props.setAttributes({ imgID: x.id })
	}
	function onFileSelect_mobile(v) {
		props.setAttributes({ MobileImgID: v.id })
	}
	function set_text_color(x) {
		props.setAttributes({ text_color: x })
	}
	function set_cta_color(x) {
		props.setAttributes({ cta_color: x })
	}

	useEffect(
		function () {
			if (props.attributes.imgID) {
				async function go() {
					const response = await apiFetch({
						path: `/wp/v2/media/${props.attributes.imgID}`,
						method: "GET"
					})
					props.setAttributes({ imgURL: response.source_url })
				}
				go()
			}
		},
		[props.attributes.imgID]
	)
	const ALLOWED_MEDIA_TYPES = ['image'];



	return (
		<div {...useBlockProps()}>

			<section className="section-first">
				<div className="section-container">
					<div className="hero-wrap">
						<div className="hero-content">


							<RichText style={{ color: props.attributes.text_color }} allowedFormats={[]} tagName="h1" value={props.attributes.main_title} onChange={handleMainTitleChange} />

							<p>
								<RichText allowedFormats={[]} tagName="span" value={props.attributes.sub_title_first} onChange={handle_sub_title_first_Change} />
								<br />
								<RichText allowedFormats={[]} tagName="span" value={props.attributes.sub_title_second} onChange={handle_sub_title_second_Change} />
							</p>


							<InspectorControls>
								<PanelBody title="Call To Action Settings" initialOpen={true}>

									<PanelRow>
										<ColorPicker
											color={props.attributes.cta_color}
											onChange={set_cta_color}
											enableAlpha
											defaultValue="#fff"
										/>
									</PanelRow>

									<PanelRow>
										<TextControl
											label="Call To Action Text:"
											value={props.attributes.cta_text}
											onChange={handleCtaTextChange}
										/>

									</PanelRow>
									<PanelRow >

										<TextControl
											label="Call To Action URL:"
											value={props.attributes.cta_url}
											onChange={handleCtaUrlChange}
										/>





									</PanelRow>
									<span>Call To Test URL:</span>
									<PanelRow >

										<LinkControl

											value={{ url: props.attributes.cta_url, title: props.attributes.cta_text }}
											onChange={(value) => {
												setAttributes({ cta_url: value.url, cta_text: value.title })
											}}
											settings={[]}
											suggestionsQuery=""
										/>



									</PanelRow>

								</PanelBody>

								<PanelBody title="Banner image settings" initialOpen={true}>

									<PanelRow >
										<MediaUploadCheck>
											<MediaUpload
												icon={postFeaturedImage}
												onSelect={onFileSelect}
												value={props.attributes.imgID}
												allowedTypes={ALLOWED_MEDIA_TYPES}
												render={({ open }) => {
													return (<Button onClick={open}> <span style={{ marginRight: "1rem" }} class="dashicons dashicons-format-image"></span><b>Select PC Banner Image</b></Button>)
												}}
											/>
										</MediaUploadCheck>

									</PanelRow>

									<PanelRow >
										<MediaUploadCheck>
											<MediaUpload
												icon={postFeaturedImage}
												onSelect={onFileSelect_mobile}
												value={props.attributes.MobileImgID}
												allowedTypes={ALLOWED_MEDIA_TYPES}
												render={({ open }) => {
													return (<Button onClick={open}> <span style={{ marginRight: "1rem" }} class="dashicons dashicons-format-image"></span><b>Select Mobile Banner Image</b></Button>)
												}}
											/>
										</MediaUploadCheck>

									</PanelRow>

									<PanelRow><b>Selected Image:</b></PanelRow>
									<PanelRow >



										<img width="300" height="200" src={props.attributes.imgURL} alt="selected banner image" loading="lazy" />
									</PanelRow>
								</PanelBody>


								<PanelBody title="Text Color Settings" initialOpen={true}>

									<PanelRow>
										<ColorPicker
											color={props.attributes.text_color}
											onChange={set_text_color}
											enableAlpha
											defaultValue="#fff"
										/>
									</PanelRow>


									{/* 	<PanelRow>
										<ChromePicker color={props.attributes.text_color} onChangeComplete={x => props.setAttributes({ text_color: x.hex })} disableAlpha={true} />
									</PanelRow> */}





								</PanelBody>





							</InspectorControls>





							<Button className="js-search-trigger" >
								<a style={{ color: props.attributes.cta_color }} href={props.attributes.cta_url} target="_blank">{props.attributes.cta_text}</a>
							</Button>

						</div>
						<img width="1920" height="600" src={props.attributes.imgURL} className="desktop" alt="" loading="lazy" />
						{/* <img width="1920" height="600" src="http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero.jpg" className="desktop" alt="" loading="lazy" srcset="http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero.jpg 1920w, http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero-300x94.jpg 300w, http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero-1024x320.jpg 1024w, http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero-768x240.jpg 768w, http://127.0.0.1/cymulate/wp-content/uploads/2022/07/hero-1536x480.jpg 1536w" sizes="(max-width: 1920px) 100vw, 1920px" /> */}
					</div>
				</div>
			</section>
		</div>
	);
}
