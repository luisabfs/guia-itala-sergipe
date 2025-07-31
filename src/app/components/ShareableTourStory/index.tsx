'use client';

import { forwardRef } from 'react';

interface Tour {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	departureTime: string;
	returnTime: string;
	included: string[];
	notIncluded: string[];
	category: 'praias' | 'cultural' | 'ecologico';
}

interface ShareableTourStoryProps {
	tour: Tour;
	className?: string;
	// Customization options
	showPrice?: boolean;
	customPrice?: string;
	showBrand?: boolean;
	showLinkBadge?: boolean;
	showTag?: boolean;
	showPromo?: boolean;
}

const ShareableTourStory = forwardRef<HTMLDivElement, ShareableTourStoryProps>(
	({
		tour,
		className = '',
		showPrice = false,
		customPrice = '',
		showBrand = true,
		showLinkBadge = false,
		showTag = true,
		showPromo = false
	}, ref) => {
		// Get category icon and color
		const getCategoryInfo = (category: string) => {
			switch (category) {
				case 'praias':
					return { icon: '🏖️', color: 'bg-blue-500', textColor: 'text-blue-600' };
				case 'cultural':
					return { icon: '🏛️', color: 'bg-amber-500', textColor: 'text-amber-600' };
				case 'ecologico':
					return { icon: '🌿', color: 'bg-green-500', textColor: 'text-green-600' };
				default:
					return { icon: '🌟', color: 'bg-gray-500', textColor: 'text-gray-600' };
			}
		};

		const categoryInfo = getCategoryInfo(tour.category);

		return (
			<div
				ref={ref}
				data-story-element
				className={`w-[1080px] h-[1920px] bg-white flex flex-col relative ${className}`}
			>
				{/* Header Image Section - 40% of height (768px) */}
				<div className="relative h-[768px] w-full flex-shrink-0">
					<img
						src={tour.imageUrl}
						alt={tour.title}
						className="w-full h-full object-cover"
						crossOrigin="anonymous"
						onError={(e) => {
							console.error('Image failed to load:', tour.imageUrl);
							e.currentTarget.style.display = 'none';
						}}
					/>

					{/* Dark overlay for text readability */}
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>

					{/* Category Badge - Top left (optional) */}
					{showTag && (
						<div className="absolute top-[100px] left-[100px]">
							<div className={`${categoryInfo.color} p-2 pb-6 bg-opacity-80 text-white rounded-full text-2xl font-bold flex items-center gap-3`}>
								<span className="text-3xl">{categoryInfo.icon}</span>
								<span>
									{tour.category === 'praias' ? 'Praias' :
										tour.category === 'cultural' ? 'Cultural/Histórico' : 'Ecológico'}
								</span>
							</div>
						</div>
					)}



					{/* Main Title - Centered */}
					<div className="absolute inset-0 flex items-center justify-center px-20">
						<h1 className="text-7xl font-bold text-white text-center leading-tight drop-shadow-2xl max-w-4xl">
							{tour.title}
						</h1>
					</div>

					{/* Promo Banner - Straight (optional) */}
					{showPromo && (
						<div className="absolute top-[100px] right-[100px]">
							<div className="bg-[#ffbd59] text-black p-4 rounded-lg">
								<div className="text-3xl font-bold">
									OFERTA IMPERDÍVEL
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Price Badge - Between image and content (optional) */}
				{showPrice && customPrice && (
					<div className="relative -mt-20 flex justify-end">
						<div className="bg-[#ffbd59] text-black p-10 rounded-3xl rounded-tr-none rounded-br-none text-7xl font-bold">
							{customPrice}
						</div>
					</div>
				)}

				{/* Content Section - 55% of height (1056px) */}
				<div className="flex-1 flex flex-col p-12 space-y-8 bg-white">
					{/* Description - 15% of content */}
					<div className="text-center flex-shrink-0 bg-white">
						<p className="text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto bg-white">
							{tour.description.length > 100
								? `${tour.description.substring(0, 100)}...`
								: tour.description}
						</p>
					</div>

					{/* Schedule Information - 20% of content */}
					<div className="bg-[#f3f4f6] rounded-3xl p-10 border border-[#e5e7eb] flex-shrink-0">
						<div className="flex items-center justify-center gap-8 text-4xl font-bold text-gray-800">
							<div className="flex items-center gap-4">
								<span className="text-5xl">🕒</span>
								<div className="flex flex-col">
									<span className="text-2xl text-gray-500">Saída</span>
									<span>{tour.departureTime}</span>
								</div>
							</div>
							<div className="w-1 h-16 bg-[#d1d5db] rounded-full"></div>
							<div className="flex items-center gap-4">
								<span className="text-5xl">🏠</span>
								<div className="flex flex-col">
									<span className="text-2xl text-gray-500">Retorno</span>
									<span>{tour.returnTime}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Included Services - 40% of content */}
					<div className="bg-white rounded-3xl p-6 border border-[#e5e7eb] flex flex-col gap">
						<h2 className="text-4xl font-bold text-gray-800 mb-4 text-center flex-shrink-0 bg-white">
							Incluído:
						</h2>
						<div className="grid grid-cols-1 flex-1 gap-3 bg-white">
							{tour.included.slice(0, 4).map((item, index) => (
								<div key={index} className="flex gap-3 text-2xl text-gray-700">
									<div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									</div>
									<span className="font-semibold h-fit">{item}</span>
								</div>
							))}
						</div>
					</div>

					{/* Footer Section - 25% of content */}
					<div className="flex-shrink-0 bg-white space-y-4">
						{/* Optional Elements Group */}
						<div className="flex flex-col gap-3">
							{/* Link Badge (optional) */}
							{showLinkBadge && (
								<div className="bg-[#1e40af] text-white px-6 py-3 rounded-full text-xl font-bold flex items-center justify-center gap-3">
									<span className="text-2xl">🔗</span>
									<span>Link na bio</span>
								</div>
							)}
						</div>
					</div>

					{/* Main CTA - Bottom */}
					{showBrand && (
						<div className="absolute bottom-40 left-20 right-20 bg-[#166534] rounded-3xl p-8 pb-16 flex gap-6">
							{/* Brand/Logo Section (optional) */}
							<div className="flex justify-center">
								<div className="relative w-24 h-24">
									<img
										src="/android-chrome-192x192.png"
										alt="Logo Guia Ítala"
										className="object-cover"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<div className="text-3xl font-bold text-white">
									Descubra Sergipe com uma Especialista
								</div>
								<div className="text-2xl text-white font-medium">
									Mais de 30 anos de experiência em turismo
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
);

ShareableTourStory.displayName = 'ShareableTourStory';

export default ShareableTourStory; 