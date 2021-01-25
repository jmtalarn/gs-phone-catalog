import React, { useState, useRef, useEffect, useContext } from 'react';
import { Phone } from '../../@types/Phone';
import notFoundImg from './notfound.jpg';
import { Button } from '../button/Button';
import ApiContext from '../../actions/api-context';

interface DetailProps {
	initialPosition?: InitialPosition;
	phone: Phone;
	onClose: () => {};
}

export interface InitialPosition {
	top: string | null;
	left: string | null;
	width: string | null;
	height: string | null;
}
const Detail: React.FC<DetailProps> = ({ phone, initialPosition, onClose }) => {
	const { name, description, price, imageFileName, ram, manufacturer, color, screen, processor, id } = phone || {};
	const detailRef = useRef(null);

	const [editing, setEditing] = useState(false);
	const [deleteClicksCount, setDeleteClicksCount] = useState(0);

	const { updatePhone, deletePhone, createPhone } = useContext(ApiContext);

	const initialPositionStyle = Object.assign(
		{},
		{
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%',
		},
		initialPosition,
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (detailRef.current) {
				detailRef.current.style.top = `${window.scrollY}px`;
				detailRef.current.style.left = 0;
				detailRef.current.style.right = 0;
				detailRef.current.style.bottom = 0;
				detailRef.current.style.width = '100%';
				detailRef.current.style.height = '100%';
			}
		}, 0);
		const showMoreDetailsTimer = setTimeout(() => {
			detailRef.current.querySelectorAll('.show-later').forEach((element) => element.classList.add('now'));
		}, 500);

		return () => {
			clearTimeout(showMoreDetailsTimer);
			clearTimeout(timer);
		};
	}, []);

	return (
		<div
			data-id="wrapper-detail"
			ref={detailRef}
			title={`Phone detail: ${name}`}
			style={{
				position: 'absolute',
				cursor: 'default',
				display: 'grid',
				gridTemplateColumns: 'repeat( auto-fit,  minmax(12rem, 1fr))',
				boxShadow: '1px 1px 2px  gray',
				borderRadius: '2px',
				transition: 'all 500ms ease-in',
				backgroundColor: 'white',
				...initialPositionStyle,
			}}
		>
			<button
				title="Click to close"
				style={{
					position: 'absolute',
					right: '1rem',
					fontSize: '2rem',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
				}}
				onClick={() => {
					detailRef.current.style.transform = 'translateX(-5000px)';
					setTimeout(() => {
						onClose();
					}, 510);
				}}
			>
				<span role="img" aria-label="The times icon to close the detail of the phone">
					✖️
				</span>
			</button>
			{!editing && (
				<Button
					primary
					label="Edit"
					style={{
						position: 'absolute',
						left: '1rem',
						zIndex: '1',
					}}
					onClick={() => {
						setEditing(true);
					}}
				/>
			)}
			{editing && (
				<Button
					secondary
					label="Save"
					style={{
						position: 'absolute',
						left: '1rem',
						zIndex: '1',
					}}
					onClick={() => {
						const form = { id };
						detailRef.current.querySelectorAll('[contentEditable').forEach((element) => {
							form[element.dataset.field] = element.textContent.trim();
						});
						updatePhone(form);
						setEditing(false);
					}}
				/>
			)}
			{editing && (
				<Button
					secondary
					label="Save as new"
					style={{
						position: 'absolute',
						left: '6rem',
						zIndex: '1',
					}}
					onClick={() => {
						const form = {};
						detailRef.current.querySelectorAll('[contentEditable').forEach((element) => {
							form[element.dataset.field] = element.textContent.trim();
						});
						detailRef.current.style.transform = 'translateX(-5000px)';
						setTimeout(() => {
							onClose();
							createPhone(form);
						}, 510);
					}}
				/>
			)}
			{editing && deleteClicksCount == 0 && (
				<Button
					secondary
					label="Delete"
					style={{
						position: 'absolute',
						left: '14.2rem',
						zIndex: '1',
					}}
					onClick={() => {
						setDeleteClicksCount(deleteClicksCount + 1);
					}}
				/>
			)}
			{editing && deleteClicksCount == 1 && (
				<Button
					primary
					label="Are you sure you want to delete this item? "
					style={{
						position: 'absolute',
						left: '14.2rem',
						color: 'crimson',
						maxWidth: '10rem',
						backgroundColor: 'white',
						zIndex: '1',
					}}
					onClick={() => {
						detailRef.current.style.transform = 'translateX(-5000px)';
						setTimeout(() => {
							onClose();
							deletePhone(id);
						}, 510);
					}}
				/>
			)}
			<div
				data-testid="item-image"
				className="sway-on-hover"
				style={{
					backgroundImage: `url(${imageFileName}), url(${notFoundImg})`,
					backgroundPosition: 'center',
					backgroundSize: 'auto 90%',
					backgroundRepeat: 'no-repeat',
					minHeight: '8rem',
					height: '100%',
					width: '100%',
					position: 'relative',
					zIndex: '0',
				}}
			>
				{editing && (
					<div style={{ bottom: '2rem', position: 'absolute', width: '100%' }}>
						<span
							role="img"
							style={{ marginRight: '1rem', fontSize: '2rem' }}
							aria-label="image to indicate where the image can be changed"
						>
							📷
						</span>
						<div contentEditable={true} data-field="imageFileName" style={{ minwidth: '100%' }}>
							{imageFileName}
						</div>
					</div>
				)}
			</div>
			<div
				style={{
					color: 'gray',
					padding: '1rem',

					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<h1 data-testid="item-title" data-field="name" contentEditable={editing}>
					{name}
				</h1>

				<p data-testid="item-description" style={{ textAlign: 'justify' }}>
					<small>
						<span contentEditable={editing} data-field="description">
							{description}
						</span>
					</small>
				</p>
				<div className="show-later">
					<div>
						<h4>More details...</h4>
						<ul>
							<li>
								<strong>Processor: </strong>{' '}
								<span contentEditable={editing} data-field="processor">
									{processor}
								</span>
							</li>
							<li>
								<strong>RAM: </strong>{' '}
								<span contentEditable={editing} data-field="ram">
									{ram}
								</span>
							</li>
							<li>
								<strong>Screen: </strong>{' '}
								<span contentEditable={editing} data-field="screen">
									{screen}
								</span>
							</li>
							<li>
								<strong>Color: </strong>{' '}
								<span contentEditable={editing} data-field="color">
									{color}
								</span>
							</li>
						</ul>
					</div>
					<h4>
						By{' '}
						<span contentEditable={editing} data-field="manufacturer">
							{manufacturer}
						</span>
					</h4>
				</div>
				<h3 data-testid="item-price" style={{ marginTop: 'auto', textAlign: 'right' }}>
					<span contentEditable={editing} data-field="price">
						{price}
					</span>
					{price ? ' €' : ''}
				</h3>
			</div>
		</div>
	);
};

export default Detail;
