import { isObjectEmpty } from '../utils';

export interface Phone {
	id: number;
	name: string;
	manufacturer: string;
	description: string;
	color: string;
	price: number;
	imageFileName: string;
	screen: string;
	processor: string;
	ram: number;
}

// export class Phone implements IPhone {
// 	id!: number;
// 	name!: string;
// 	manufacturer!: string;
// 	description!: string;
// 	color!: string;
// 	price!: number;
// 	imageFileName!: string;
// 	screen!: string;
// 	processor!: string;
// 	ram!: number;

// 	constructor(...args: any) {
// 		if (!isObjectEmpty(args)) {
// 			const { id, name, manufacturer, description, color, price, imageFileName, screen, processor, ram } = args;
// 			this.id = id;
// 			this.name = name;
// 			this.manufacturer = manufacturer;
// 			this.description = description;
// 			this.color = color;
// 			this.price = price;
// 			this.imageFileName = imageFileName;
// 			this.screen = screen;
// 			this.processor = processor;
// 			this.ram = ram;
// 		}
// 	}
// }
