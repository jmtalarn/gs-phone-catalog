import React from 'react';
import { Phone } from '../../@types/Phone';
import GridItem from '../grid-item/GridItem';

export interface GridProps {
	items?: Phone[];
}

const Grid = ({ items }: GridProps) => (
	<div
		data-testid="grid"
		style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fill, minmax(20rem, 1fr))', gap: '1rem' }}
	>
		{items &&
			items?.map((item, index) => {
				return <GridItem key={`item_index_${index}`} phone={item} />;
			})}
	</div>
);

export default Grid;
