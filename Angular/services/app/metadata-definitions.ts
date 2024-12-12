/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
export class Application {
	ID: string = '';
	Platform: string = '';
	URL: string = '';
}

export class Application_Related {
	Prioritized: boolean = false;
	List: Application[] = [];
}




export class Display {
	public Primary: string = '';
	public Overrides: string[] = [];
	public Orientation: string = '';
}




export class Icon {
	public Source: string = '';
	public Type: string = '';
	public Purpose: string = '';
	public Width: number = 0;
	public Height: number = 0;
}




export class Contact {
	public ID: string = '';
	public Type: string = '';
	public URL: string = '';
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




export class Protocol_Handler {
	public Protocol: string = '';
	public URL: string = '';
}

export class Protocol {
	public Start: string = '';
	public Scope: string = '';
	public Handlers: Protocol_Handler[] = [];
}




export class SEO {
	public Add: string[] = [];
	public Remove: string[] = [];
	public Robot: string = '';
}




export class Screenshot {
	public Label: { [lang: string]: string } = {};
	public Form_Factor: string = '';
	public Source: string = '';
	public Type: string = '';
	public Width: number = 0;
	public Height: number = 0;
}




export class Shortcut {
	public URL: string = '';
	public Name_Long: { [lang: string]: string } = {};
	public Name_Short: { [lang: string]: string } = {};
	public Description: { [lang: string]: string } = {};
	public Icons: Icon[] = [];
}




export class Metadata {
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
	public Screenshots: Screenshot[] = [];
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
	public Icons: Icon[] = [];
	public Display: Display = {
		Primary: '',
		Overrides: [],
		Orientation: '',
	};
}
