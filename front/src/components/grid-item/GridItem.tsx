import React, { useState, useRef } from 'react';
import { Phone } from '../../@types/Phone';
import notFoundImg from './notfound.jpg';
import Detail, { InitialPosition } from '../detail/Detail';

interface GridItemProps {
	showDetail?: boolean;
	phone: Phone;
}

const GridItem: React.FC<GridItemProps> = ({ phone, showDetail: showDetailInitialState }) => {
	const { name, description, price, imageFileName } = phone || {};
	const [showDetail, setShowDetail] = useState(showDetailInitialState);
	const elementRef = useRef(null);

	const getContentGridItemPosition: InitialPosition = (elementRef) => {
		if (elementRef.current) {
			return {
				top: `${elementRef.current?.offsetTop}px`,
				left: `${elementRef.current?.offsetLeft}px`,
				width: `${elementRef.current?.getBoundingClientRect().width}px`,
				height: `${elementRef.current?.getBoundingClientRect().height}px`,
			};
		} else {
			return { top: null, left: null, width: null, heigh: null };
		}
	};

	return (
		<>
			<div
				data-testid="grid-item"
				data-id="wrapper"
				ref={elementRef}
				title="Click on card to see details"
				style={{
					cursor: 'pointer',
					display: 'grid',
					gridTemplateColumns: 'repeat( auto-fit,  minmax(12rem, 1fr))',
					boxShadow: '1px 1px 2px  gray',
					borderRadius: '2px',
					transition: 'all 500ms ease-in',
					backgroundColor: 'white',
				}}
				onClick={() => {
					if (!showDetail) {
						setShowDetail(!showDetail);
					}
				}}
			>
				<div
					data-testid="item-image"
					className="shake-on-hover"
					style={{
						backgroundImage: `url(${imageFileName}), url(${notFoundImg})`,
						backgroundPosition: 'center',
						backgroundSize: 'auto 90%',
						backgroundRepeat: 'no-repeat',
						minHeight: '8rem',
						height: '100%',
						width: '100%',
					}}
				></div>
				<div
					style={{
						color: 'gray',
						padding: '1rem',

						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<h1 data-testid="item-title">{name}</h1>

					<p data-testid="item-description" style={{ textAlign: 'justify' }}>
						<small>{description}</small>
					</p>
					<h3 data-testid="item-price" style={{ marginTop: 'auto', textAlign: 'right' }}>
						{price ? `${price} €` : ''}
					</h3>
				</div>
			</div>
			{showDetail && (
				<Detail
					phone={phone}
					initialPosition={getContentGridItemPosition(elementRef)}
					onClose={() => {
						setShowDetail(false);
					}}
				/>
			)}
		</>
	);
};

export default GridItem;
