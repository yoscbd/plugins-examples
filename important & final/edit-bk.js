import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { format, dateI18n, __experimentalGetSettings } from '@wordpress/date';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, QueryControls, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts, numberOfColumns, displayFeaturedImage, order, orderBy, categories, toggleTreats, Prioritizing } =
		attributes;

	const catIDs =
		categories && categories.length > 0
			? categories.map((cat) => cat.id)
			: [];
	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'threats', {
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby: orderBy,
				categories: catIDs,
				Prioritize: [Prioritizing]

			});
		},
		[numberOfPosts, order, orderBy, categories, Prioritizing]
	);

	toggleTreats ? setAttributes({ Prioritizing: 4 }) : setAttributes({ Prioritizing: 5 })
	/* 	if (toggleTreats) {
			setAttributes({ Prioritizing: 4 });
	
		} else {
			setAttributes({ Prioritizing: 5 });
		} */

	/* 	$args = array(
			'posts_per_page' => -1,
			'post_type' => 'threats',
			'paged' => $_POST['paged'],
			'orderby' => 'date',
			'order' => 'DESC',
			'tax_query' => array(
				array(
					'taxonomy' => 'Prioritize',
					'terms' => 4,
					'field' => 'term_id',
				),
			),
		
		); */




	const allCats = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		});
	}, []);

	const catSuggestions = {};
	if (allCats) {
		for (let i = 0; i < allCats.length; i++) {
			const cat = allCats[i];
			catSuggestions[cat.name] = cat;
		}
	}

	const onDisplayFeaturedImageChange = (value) => {
		setAttributes({ displayFeaturedImage: value });
	};
	const onToggleTreatsChange = (value) => {
		setAttributes({ toggleTreats: value });
	};
	const onNumberOfItemsChange = (value) => {
		setAttributes({ numberOfPosts: value });
	};

	const onNumberOfColumnsChange = (value) => {
		setAttributes({ numberOfColumns: value });
	};

	const onCategoryChange = (values) => {
		const hasNoSuggestions = values.some(
			(value) => typeof value === 'string' && !catSuggestions[value]
		);
		if (hasNoSuggestions) return;

		const updatedCats = values.map((token) => {
			return typeof token === 'string' ? catSuggestions[token] : token;
		});

		setAttributes({ categories: updatedCats });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__('Display Featured Image', 'latest-posts')}
						checked={displayFeaturedImage}
						onChange={onDisplayFeaturedImageChange}
					/>
					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfItemsChange}
						maxItems={10}
						minItems={1}
						orderBy={orderBy}
						onOrderByChange={(value) =>
							setAttributes({ orderBy: value })
						}
						order={order}
						onOrderChange={(value) =>
							setAttributes({ order: value })
						}
						categorySuggestions={catSuggestions}
						selectedCategories={categories}
						onCategoryChange={onCategoryChange}
					/>

					<RangeControl
						label="Columns Number"
						value={numberOfColumns}
						onChange={onNumberOfColumnsChange}
						min={1}
						max={4}
					/>

					<ToggleControl
						label={__('Treawt level selection', 'latest-posts')}
						checked={toggleTreats}
						onChange={onToggleTreatsChange}
					/>


				</PanelBody>
			</InspectorControls>
			<ul {...useBlockProps()}>
				{posts &&
					posts.map((post) => {
						const featuredImage =
							post._embedded &&
							post._embedded['wp:featuredmedia'] &&
							post._embedded['wp:featuredmedia'].length > 0 &&
							post._embedded['wp:featuredmedia'][0];
						return (
							<>
								<li key={post.id} className={"columns-" + numberOfColumns} >



									{displayFeaturedImage && featuredImage && (
										<img
											src={
												featuredImage.media_details.sizes.full.source_url
											}
											alt={featuredImage.alt_text}
										/>
									)}
									<img width="95" height="95" src="http://127.0.0.1/cymulate/wp-content/uploads/2022/07/Immediate-threat-icon.png" className="img-responsive treat-icon" alt="icon" loading="lazy" />

									<h5>
										<a href={post.link}>
											{post.title.rendered ? (

												post.title.rendered

											) : (
												__('(No title)', 'latest-posts')
											)}
										</a>
									</h5>
									{post.date_gmt && (
										<time dateTime={format('c', post.date_gmt)}>
											{dateI18n(
												__experimentalGetSettings().formats
													.date,
												post.date_gmt
											)}
										</time>
									)}
									{/* 		{post.excerpt.rendered && (
										<div className="editor-ybd-li"><RawHTML>{post.excerpt.rendered}</RawHTML></div>
									)} */}
								</li>
							</>
						);
					})}
			</ul>
		</>
	);
}
