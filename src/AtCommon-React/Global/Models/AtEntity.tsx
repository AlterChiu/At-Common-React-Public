class AtEntity {
  classes: string;
  properties: Record<string, boolean>;
  attributes: Record<string, string>;

  constructor({ classes = "", properties = {}, attributes = {} } = {}) {
    this.classes = classes; /* "class1 class2...." */
    this.properties = properties; /*{"key1":true , "key2":false}*/
    this.attributes = attributes; /*{key :value , key2 :value2}*/
  }

  addClass(classes: string) {
    this.classes = this.classes + " " + classes;
  }

  removeClass(classes: string) {
    this.classes.replace(classes.trim(), "");
  }

  addProperties(key: string, trueFalse: boolean) {
    this.properties[key] = trueFalse;
  }

  removeProperties(key: string) {
    try {
      delete this.properties[key];
    } catch {}
  }

  addAttributes(key: string, value: string) {
    this.attributes[key] = value;
  }

  removeAttributes(key: string) {
    try {
      delete this.attributes[key];
    } catch {}
  }

  toJson(): Record<string, any> {
    return {
      classes: this.classes,
      properties: this.properties,
      attributes: this.attributes,
    };
  }
}

export default AtEntity;
