import AtEntity from "./AtEntity";

class AtKeyValueEntity extends AtEntity {
  key : string = "";
  value : string ="";
  constructor({
    key = "",
    value = "",
    classes = "",
    properties = {},
    attributes = {},
  } = {}) {
    // 繼承關係
    super({ classes, properties, attributes });

    // key value pair專用
    this.key = key;
    this.value = value;
  }

  toJson(): Record<string,any> {
    var entity = super.toJson();
    entity.key = this.key;
    entity.value = this.value;
    return entity;
  }
}

export default AtKeyValueEntity;
