/*
 * COPYRIGHT LICENSE NOTICE HERE
 */


// IMPORTANT NOTICE
// (1) This is the kernel level source codes defining critical data structures
//     for the project's proper operations.
//
// (2) These definitions can be modified to rely on your external libraries
//     BUT only isolated at this level. You can use 'extend' to extend from
//     your external libraries.
//
// (3) AVOID changing existing definitions at all cost. It can cripple the
//     project without overhauling.
export class Application {
	public ID: string = '';
	public Platform: string = '';
	public URL: string = '';
}

export class Application_Related {
	public Prioritized: boolean = false;
	public List: Application[] = [];
}




export class Contact {
	public ID: string = '';
	public Type: string = '';
	public URL: string = '';
}




export class Display {
	public Primary: string = '';
	public Overrides: string[] = [];
	public Orientation: string = '';
}




export class Media {
	public Text: { [lang: string]: string } = {};
	public Width: number = 0;
	public Height: number = 0;
	public Sources: Source[] = [];
	public Is_Decorative?: boolean = false;
	public Loading?: string = 'lazy';
	public CORS?: string = 'anonymous';
	public Form_Factor?: string = '';
	public Purpose?: string = '';
	public Relationship?: string = '';
	public Design?: string = '';
	public Preload?: string = '';
	public Control?: boolean = true;
	public Autoplay?: boolean = false;
	public Loop?: boolean = false;
	public Mute?: boolean = false;
	public Inline?: boolean = false;
	public Tracks?: Track[] = [];
}




export class Metadata_Page {
	public Lang: string = '';
	public Title: string = '';
	public Description: string = '';
	public Keywords: string = '';
	public Others: { [key: number]: any } = {};
	public Thumbnails: Media[] = [];

	public Mode_Browser: boolean = false;
	public URL: string = '';
	public Site?: Metadata_Site = undefined;
}




export class Metadata_Site {
	public ID: string = '';
	public ID_CNAME: string = '';
	public ID_APP: string = '';
	public ID_SKU: string = '';
	public Language_Default: string = '';
	public Name: { [lang: string]: string } = {};
	public Description: { [lang: string]: string } = {};
	public Keywords: { [lang: string]: string[] } = {};
	public Color_Theme_Foreground: string = '';
	public Color_Theme_Background: string = '';
	public Owners: Owner[] = [];
	public Screenshots: Media[] = [];
	public Protocol: Protocol = {
		Start: '',
		Scope: '',
		Handlers: [],
	};
	public Related_Application: Application_Related = {
		Prioritized: false,
		List: [],
	};
	public Shortcuts: Shortcut[] = [];
	public SEO: SEO = {
		Add: [],
		Remove: [],
		Robot: '',
	};
	public Icons: Media[] = [];
	public Thumbnails: Media[] = [];
	public Display: Display = {
		Primary: '',
		Overrides: [],
		Orientation: '',
	};
}




export class Owner {
	public UUID: string = '';
	public Name_Family: { [lang: string]: string } = {};
	public Name_Given: { [lang: string]: string } = {};
	public Call_Sign: { [lang: string]: string } = {};
	public Title: { [lang: string]: string } = {};
	public Description: { [lang: string]: string } = {};
	public Slogan: { [lang: string]: string } = {};
	public Contacts: { [type: string]: { [lang: string]: Contact } } = {};
	public Roles: string[] = [];
}




export class Protocol {
	public Start: string = '';
	public Scope: string = '';
	public Handlers: Protocol_Handler[] = [];
}

export class Protocol_Handler {
	public Protocol: string = '';
	public URL: string = '';
}




export class SEO {
	public Add: string[] = [];
	public Remove: string[] = [];
	public Robot: string = '';
}




export class Shortcut {
	public URL: string = '';
	public Name_Long: { [lang: string]: string } = {};
	public Name_Short: { [lang: string]: string } = {};
	public Description: { [lang: string]: string } = {};
	public Icons: Media[] = [];
}




export class Source {
	public URL: string = '';
	public Type: string = '';
	public Media?: string = '';
	public Descriptor?: string = '';
}




export class Track {
	public URL: string = '';
	public Kind: string = '';
	public Label: string = '';
	public Default: boolean = false;
}




export function Yield_Thumbnails(
	media: Media[],
	url_base: string,
	lang: string,
	label: string,
): Media[] {
	var list: Media[] = [];
	var text_alt = '';


	// validate input
	if (media.length == 0) {
		return list;
	}


	// execute
	for (var i = 0; i < media.length; i++) {
		if (media[i].Sources.length == 0) {
			continue;
		}

		var url = Yield_URL(media[i].Sources[0].URL, url_base);
		if (url == '') {
			continue;
		}

		if (media[i].Width == 0 || media[i].Height == 0) {
			continue;
		}

		text_alt = label;
		if (media[i].Text[lang] != '') {
			text_alt = media[i].Text[lang];
		}

		if (media[i].Sources[0].Type.startsWith('image/')) {
		} else if (media[i].Sources[0].Type.startsWith('video/')) {
		} else if (media[i].Sources[0].Type.startsWith('audio/')) {
		} else {
			continue;
		}

		list.push({
			Text: {
				[lang]: text_alt,
			},
			Sources: [{
				URL: url,
				Type: media[i].Sources[0].Type,
			}],
			Width: media[i].Width,
			Height: media[i].Height,
		});
	}

	// report status
	return list;
}




export function Yield_URL(url_given: string, url_base: string): string {
	// execute
	if (url_given == '' && url_base == '') {
		return '';
	}

	if (url_given == '' && url_base != '') {
		return url_base;
	}

	if (url_given.replace(/^.*:/gm, '') != url_given) {
		// given is an absolute protocol - return now
		return url_given;
	}

	return url_base.replace(/\/$/, "") + '/' + url_given.replace(/^\//, "");
}
