/**
 * Internal dependencies
 */
import icons from './icons';
import { ALLOWED_BG_MEDIA_TYPES } from './';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Popover, MenuItem } from '@wordpress/components';

/**
 * Background image block toolbar controls.
 *
 * @param {Object} props The passed props.
 * @return {string} Component.
 */
function BackgroundControls( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		backgroundImg,
		openPopover,
	} = attributes;

	return (
		<Fragment>
			<MediaUploadCheck>
				<Toolbar className={ backgroundImg ? 'components-dropdown-menu' : '' }>
					{ openPopover && (
						<Popover
							position="bottom center"
							className="components-coblocks__background-popover"
						>
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( { backgroundImg: media.url, backgroundType: media.type, openPopover: ! openPopover } );
								} }
								allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
								value={ backgroundImg }
								render={ ( { open } ) => (
									<MenuItem
										className="components-dropdown-menu__menu-item"
										icon="edit"
										role="menuitem"
										onClick={ open } >
										{ __( 'Edit background', 'coblocks' ) }
									</MenuItem>
								) }
							/>
							<MenuItem
								className="components-dropdown-menu__menu-item"
								icon="trash"
								role="menuitem"
								onClick={ () => {
									setAttributes( {
										backgroundImg: '',
										backgroundOverlay: 0,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: '',
										backgroundSize: 'cover',
										hasParallax: false,
										openPopover: ! openPopover,
									} );
								} } >
								{ __( 'Remove background', 'coblocks' ) }
							</MenuItem>
						</Popover>
					) }
					{ backgroundImg ?
						<ToolbarButton
							className="components-dropdown-menu__toggle"
							icon={ icons.background }
							aria-haspopup="true"
							label={ __( 'Edit background image', 'coblocks' ) }
							tooltip={ __( 'Edit background image', 'coblocks' ) }
							onClick={ () => setAttributes( { openPopover: ! openPopover } ) }
						/>
						:
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( { backgroundImg: media.url, backgroundType: media.type } );
							} }
							allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
							value={ backgroundImg }
							render={ ( { open } ) => (
								<ToolbarButton
									className="components-toolbar__control"
									label={ __( 'Add background image', 'coblocks' ) }
									icon={ icons.background }
									onClick={ open }
								/>
							) }
						/>

					}
				</Toolbar>
			</MediaUploadCheck>
		</Fragment>
	);
}

export default BackgroundControls;
