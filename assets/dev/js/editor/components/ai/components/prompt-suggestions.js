import { Box, Typography, Stack, Chip as ChipBase, styled } from '@elementor/ui';
import StyledChip from './ui/styled-chip';

const PromptSuggestions = ( props ) => {
	return (
		<Box>
			<Typography variant="subtitle1" color="text.secondary">
				{ __( 'Suggested prompts:', 'elementor' ) }
			</Typography>

			<Stack direction="column" alignItems="flex-start" gap={ 3 } sx={ { my: 3 } }>
				{ props.suggestions?.map( ( option, index ) => (
					<StyledChip
						key={ index }
						variant="outlined"
						size="large"
						color="secondary"
						label={ props.suggestionFilter?.( option ) || option }
						onClick={ () => props.onSelect( option ) }
					/>
				) ) }
			</Stack>
		</Box>
	);
};

export default PromptSuggestions;
