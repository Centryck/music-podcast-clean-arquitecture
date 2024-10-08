export interface DetailedItunesPodcast {
	resultCount: number;
	results: [{
		wrapperType: string;
		kind: string;
		artistId: number;
		collectionId: number;
		trackId: number;
		artistName: string;
		collectionName: string;
		trackName: string;
		collectionCensoredName: string;
		trackCensoredName: string;
		artistViewUrl: string;
		collectionViewUrl: string;
		feedUrl: string;
		trackViewUrl: string;
		artworkUrl30: string;
		artworkUrl60: string;
		artworkUrl100: string;
		collectionPrice: number;
		trackPrice: number;
		collectionHdPrice: number;
		releaseDate: Date;
		collectionExplicitness: string;
		trackExplicitness: string;
		trackCount: number;
		trackTimeMillis: number;
		country: string;
		currency: string;
		primaryGenreName: string;
		contentAdvisoryRating: string;
		artworkUrl600: string;
		genreIds: string[];
		genres: string[];
	}]
}


export interface Entry {
	"im:name": {
		label: string;
	};
	"im:image": [{
		label: string;
		attributes: {
			height: string;
		};
	}];
	summary: {
		label: string;
	};
	"im:price": {
		label: string;
		attributes: {
			amount: string;
			currency: string;
		};
	};
	"im:contentType": {
		attributes: {
			term: string;
			label: string;
		};
	};
	rights: {
		label: string;
	};
	title: {
		label: string;
	};
	link: {
		attributes: {
			rel: string;
			type: string;
			href: string;
		};
	};
	id: {
		label: string;
		attributes: {
		"im:id": string;
		};
	};
	"im:artist": {
		label: string;
		attributes: {
			href: string;
		};
	};
	category: {
		attributes: {
			"im:id": string;
			term: string;
			scheme: string;
			label: string;
		};
	};
	"im:releaseDate": {
		label: Date;
		attributes: {
			label: string;
		}
	}
}

export interface ItunesPodcast {
	feed: {
		author: {
			name: {
				label: string;
			};
			uri: {
				label: string;
			};
		};
		entry: Entry[];
	}
}