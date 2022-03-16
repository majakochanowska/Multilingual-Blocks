const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { SelectControl, PanelBody } = wp.components;
const { __ } = wp.i18n;

/**
 * Add "language" attribute
 *
 * @param {Object} settings Settings for the block.
 */
const addAttributes = ( settings ) => {

	settings.attributes = Object.assign( settings.attributes, {
		language: {
			type: 'string',
			default: 'all',
		},
	} );

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'MultilingualBlocks/add-attributes',
	addAttributes,
);

/**
 * Add Language panel in Inspector Controls.
 */
const languagePanel = createHigherOrderComponent( ( BlockEdit ) => {
	return ( properties ) => {

		const {
			attributes,
			setAttributes,
			isSelected,
		} = properties;

		const {
			language,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit { ...properties } />
				{ isSelected &&
					<InspectorControls>
						<PanelBody
							title={ __( 'Display in language', 'multiligual-blocks' ) }
						>
							<SelectControl
								value={ language }
								options={ [
									{ label: 'All', value: 'all' },
									{ label: 'English', value: 'en_GB' },
									{ label: 'Polish', value: 'pl_PL' },
								] }
								onChange={ ( value ) => setAttributes( { language: value } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'languagePanel' );

addFilter(
	'editor.BlockEdit',
	'MultiligualBlocks/language-panel',
	languagePanel,
);
