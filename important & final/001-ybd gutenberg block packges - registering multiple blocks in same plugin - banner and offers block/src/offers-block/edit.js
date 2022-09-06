import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from "@wordpress/block-editor"
import './editor.scss';
import { ContentSearch, ClipboardButton, useMedia } from '@10up/block-components';

export default function Edit(props) {


	const blockProps = useBlockProps({
		className: 'section-second',
		style: { height: "auto" }
	});







	function oncontentSearch(x) {
		console.log(x);
		props.setAttributes({ main_text: x.title })
	}

	return (
		<>

			{/* 	{props.attributes.main_text === 'ttt' &&
				<notice status="success">
					<p>
						ANotice that main text is TTT: <code>props.attributes.main_text</code>.
					</p>
				</notice>} */}

			<section {...blockProps}>


				{/* 		<ContentSearch
					onSelectItem={(item) => { { oncontentSearch(item) } }}
					mode="post"
					label={"Please select a Post or Page:"}
					contentTypes={['post', 'page']}
				/>


				<ClipboardButton
					text="The string to be copied to the clipboard"
					onSuccess={() => { console.log('String copied!') }}
					labels={{ copy: 'Copy text', copied: 'Text copied!' }}
					disabled={false}
				/> */}


				<div className="grid-container">
					<div className="item item1">



						<RichText
							tagName="h3"
							value={props.attributes.main_text} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ main_text: value })}
							placeholder={__('Main Title...')} // Display this text before any content has been added by the user
						/>



					</div>
					<div className="item item2">


						<RichText
							tagName="h4"
							value={props.attributes.item_1_title}
							//allowedFormats={['core/bold', 'core/italic']} 
							onChange={(value) => props.setAttributes({ item_1_title: value })}
							placeholder={__('First Item Title...')}
						/>


						<RichText
							tagName="p"
							value={props.attributes.item_1_text}
							//allowedFormats={['core/bold', 'core/italic']} 
							onChange={(value) => props.setAttributes({ item_1_text: value })}
							placeholder={__('First Item Text...')}
						/>

					</div>
					<div className="item item3">

						<RichText
							tagName="h4"
							value={props.attributes.item_2_title}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_2_title: value })}
							placeholder={__('Second Item Title...')}
						/>



						<RichText
							tagName="p"
							value={props.attributes.item_2_text}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_2_text: value })}
							placeholder={__('Second Item Text...')}
						/>
					</div>
					<div className="item item4">
						<RichText
							tagName="h4"
							value={props.attributes.item_3_title}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_3_title: value })}
							placeholder={__('Third Item Title...')}
						/>


						<RichText
							tagName="p"
							value={props.attributes.item_3_text}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_3_text: value })}
							placeholder={__('Third Item Text...')}
						/>

					</div>


				</div>
			</section>
		</>

	);
}
