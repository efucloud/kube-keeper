import { formats } from "@kubernetes-models/validate";
export const validate = validate25;
const schema10 = {
  "type": "object",
  "properties": {
    "apiVersion": {
      "$ref": "8jJ3lc4QvceqqMIz3er0R3ElLo0C7k7Hbgy5w88m3iI"
    },
    "kind": {
      "$ref": "1dhEYWxkMCZZmDe45WUStE9xc8WsReMQU3Zs6n90"
    },
    "metadata": {
      "$ref": "a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU"
    },
    "spec": {
      "$ref": "VjD8bROzr7Fz4QVGZfmaDyH6yWpe5eKRuSlqmHbMyLQ"
    },
    "status": {
      "$ref": "YKe31FBnroMTftjwY2uorIA2sQxvECIXiXDYIbWWY"
    }
  },
  "required": ["spec", "apiVersion", "kind"],
  "$id": "gateway.networking.k8s.io.v1.BackendTLSPolicy"
};
const schema11 = {
  "type": "string",
  "enum": ["gateway.networking.k8s.io/v1"]
};
function validate26(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "gateway.networking.k8s.io/v1")) {
    const err1 = {
      instancePath,
      schemaPath: "#/enum",
      keyword: "enum",
      params: {
        allowedValues: schema11.enum
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate26.errors = vErrors;
  return errors === 0;
}
const schema12 = {
  "type": "string",
  "enum": ["BackendTLSPolicy"]
};
function validate28(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "BackendTLSPolicy")) {
    const err1 = {
      instancePath,
      schemaPath: "#/enum",
      keyword: "enum",
      params: {
        allowedValues: schema12.enum
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate28.errors = vErrors;
  return errors === 0;
}
const schema13 = {
  "nullableRef": "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#"
};
const schema14 = {};
import { validate as validate31 } from "@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta";
function validate30(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (!validate31(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData
    })) {
      vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
      errors = vErrors.length;
    }
  }
  validate30.errors = vErrors;
  return errors === 0;
}
const schema15 = {
  "properties": {
    "options": {
      "$ref": "Q3qCfXBiSQnqFPotX6tKpl7AzyF6p4VxMrhulRuGfN0"
    },
    "targetRefs": {
      "$ref": "KZAHWl9rY6O2cAQTrw64bxRLw2sodRSpUQyjEbB8Y"
    },
    "validation": {
      "$ref": "0L694UqkZdDom1uvFrl5XIHgmGatrDcL3OEKNLp14"
    }
  },
  "required": ["targetRefs", "validation"],
  "type": "object"
};
const schema16 = {
  "additionalProperties": {
    "$ref": "tyVEs7dYSKRRTN5W9WWUiOVANwKZejjekF6RCn9udqI"
  },
  "maxProperties": 16,
  "type": "object",
  "properties": {},
  "nullable": true
};
const schema17 = {
  "maxLength": 4096,
  "minLength": 0,
  "type": "string"
};
import func2 from "@kubernetes-models/validate/runtime/ucs2length";
function validate36(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 4096) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 4096
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 0
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate36.errors = vErrors;
  return errors === 0;
}
function validate35(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(data && typeof data == "object" && !Array.isArray(data)) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (Object.keys(data).length > 16) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxProperties",
        keyword: "maxProperties",
        params: {
          limit: 16
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!validate36(data[key0], {
        instancePath: instancePath + "/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"),
        parentData: data,
        parentDataProperty: key0,
        rootData
      })) {
        vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
        errors = vErrors.length;
      }
    }
  }
  validate35.errors = vErrors;
  return errors === 0;
}
const schema18 = {
  "items": {
    "$ref": "VZKuYraoNCpyieXuWusColKNI2BkXCGeN9SaPyYNPII"
  },
  "maxItems": 16,
  "minItems": 1,
  "type": "array"
};
const schema19 = {
  "properties": {
    "group": {
      "$ref": "LLmBAKMEHxCQnlH1ZodmJojMDIuUyAf0lQ04bymmXA"
    },
    "kind": {
      "$ref": "5BBoRfrZrwyRu9wJwHnK0wHJ0kUoAmhsYhy9Vpr0bks"
    },
    "name": {
      "$ref": "xwpijLRhjUEJllEse3cgJuQz6UsEYqfhm0t12sQjFe4"
    },
    "sectionName": {
      "$ref": "q9ca0KFEUM7TMEh4mWmmFYB0OWEZN7fGsG5EzZTrt8"
    }
  },
  "required": ["group", "kind", "name"],
  "type": "object"
};
const schema6 = {
  "maxLength": 253,
  "pattern": "^$|^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$",
  "type": "string"
};
const pattern0 = new RegExp("^$|^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$", "u");
function validate21(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (!pattern0.test(data)) {
      const err1 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^$|^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
const schema7 = {
  "maxLength": 63,
  "minLength": 1,
  "pattern": "^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$",
  "type": "string"
};
const pattern1 = new RegExp("^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$", "u");
function validate22(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 63) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 63
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern1.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
const schema8 = {
  "maxLength": 253,
  "minLength": 1,
  "type": "string"
};
function validate23(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
const schema9 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$",
  "type": "string",
  "nullable": true
};
const pattern2 = new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$", "u");
function validate24(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern2.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate24.errors = vErrors;
  return errors === 0;
}
function validate40(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.group === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "group"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.kind === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "kind"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name === undefined) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "name"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.group !== undefined) {
      if (!validate21(data.group, {
        instancePath: instancePath + "/group",
        parentData: data,
        parentDataProperty: "group",
        rootData
      })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (!validate22(data.kind, {
        instancePath: instancePath + "/kind",
        parentData: data,
        parentDataProperty: "kind",
        rootData
      })) {
        vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (!validate23(data.name, {
        instancePath: instancePath + "/name",
        parentData: data,
        parentDataProperty: "name",
        rootData
      })) {
        vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
    if (data.sectionName !== undefined) {
      if (!validate24(data.sectionName, {
        instancePath: instancePath + "/sectionName",
        parentData: data,
        parentDataProperty: "sectionName",
        rootData
      })) {
        vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate40.errors = vErrors;
  return errors === 0;
}
function validate39(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 16) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxItems",
        keyword: "maxItems",
        params: {
          limit: 16
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.length < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minItems",
        keyword: "minItems",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate40(data[i0], {
        instancePath: instancePath + "/" + i0,
        parentData: data,
        parentDataProperty: i0,
        rootData
      })) {
        vErrors = vErrors === null ? validate40.errors : vErrors.concat(validate40.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "array"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate39.errors = vErrors;
  return errors === 0;
}
const schema20 = {
  "properties": {
    "caCertificateRefs": {
      "$ref": "vvVomvYVeBbmJTwAJf0TaNYldw6Neebk1PBvuvI"
    },
    "hostname": {
      "$ref": "AndTNze2NbAt7FHti8aNffAUO57QPrMPGFxsWLCEs"
    },
    "subjectAltNames": {
      "$ref": "ChOiMx6rTh5XuGJXBkJIWgtCc1Q1Lzd81mYUAE1Aok"
    },
    "wellKnownCACertificates": {
      "$ref": "MFCWuehxdEPHAzWUw6h0yWZu0FzTA3ANZfWTvPF7j8"
    }
  },
  "required": ["hostname"],
  "type": "object"
};
const schema21 = {
  "items": {
    "$ref": "aSfyLDrCCybvWTXcI0EghuwHTKYDrsk5BWRKyfokU"
  },
  "maxItems": 8,
  "type": "array",
  "nullable": true
};
const schema22 = {
  "properties": {
    "group": {
      "$ref": "LLmBAKMEHxCQnlH1ZodmJojMDIuUyAf0lQ04bymmXA"
    },
    "kind": {
      "$ref": "5BBoRfrZrwyRu9wJwHnK0wHJ0kUoAmhsYhy9Vpr0bks"
    },
    "name": {
      "$ref": "xwpijLRhjUEJllEse3cgJuQz6UsEYqfhm0t12sQjFe4"
    }
  },
  "required": ["group", "kind", "name"],
  "type": "object"
};
function validate49(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.group === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "group"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.kind === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "kind"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name === undefined) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "name"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.group !== undefined) {
      if (!validate21(data.group, {
        instancePath: instancePath + "/group",
        parentData: data,
        parentDataProperty: "group",
        rootData
      })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (!validate22(data.kind, {
        instancePath: instancePath + "/kind",
        parentData: data,
        parentDataProperty: "kind",
        rootData
      })) {
        vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (!validate23(data.name, {
        instancePath: instancePath + "/name",
        parentData: data,
        parentDataProperty: "name",
        rootData
      })) {
        vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate49.errors = vErrors;
  return errors === 0;
}
function validate48(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "array"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    if (data.length > 8) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxItems",
        keyword: "maxItems",
        params: {
          limit: 8
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate49(data[i0], {
        instancePath: instancePath + "/" + i0,
        parentData: data,
        parentDataProperty: i0,
        rootData
      })) {
        vErrors = vErrors === null ? validate49.errors : vErrors.concat(validate49.errors);
        errors = vErrors.length;
      }
    }
  }
  validate48.errors = vErrors;
  return errors === 0;
}
const schema23 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$",
  "type": "string"
};
function validate55(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern2.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate55.errors = vErrors;
  return errors === 0;
}
const schema24 = {
  "items": {
    "$ref": "32wRW94gK0dXqcwzN8DdAROMbKkpwQjG87NlgK9U2c"
  },
  "maxItems": 5,
  "type": "array",
  "nullable": true
};
const schema25 = {
  "properties": {
    "hostname": {
      "$ref": "7MTXiYxU79hB7VpKGmxfLwAJL0WS8hIEyCOHihyy9g"
    },
    "type": {
      "$ref": "St27AL6qNzd1vwaoHCsmXUb6iWSAXTGl8khtaZreg4"
    },
    "uri": {
      "$ref": "ZBQaHOgBQ14xqEv1mPJgI2EjGa7T8DOV9ABMkPEt7g"
    }
  },
  "required": ["type"],
  "type": "object"
};
const schema26 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^(\\*\\.)?[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$",
  "type": "string",
  "nullable": true
};
const pattern4 = new RegExp("^(\\*\\.)?[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$", "u");
function validate59(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern4.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^(\\*\\.)?[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate59.errors = vErrors;
  return errors === 0;
}
const schema27 = {
  "enum": ["Hostname", "URI"],
  "type": "string"
};
function validate61(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "Hostname" || data === "URI")) {
    const err1 = {
      instancePath,
      schemaPath: "#/enum",
      keyword: "enum",
      params: {
        allowedValues: schema27.enum
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate61.errors = vErrors;
  return errors === 0;
}
const schema28 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^(([^:/?#]+):)(//([^/?#]*))([^?#]*)(\\?([^#]*))?(#(.*))?",
  "type": "string",
  "nullable": true
};
const pattern5 = new RegExp("^(([^:/?#]+):)(//([^/?#]*))([^?#]*)(\\?([^#]*))?(#(.*))?", "u");
function validate63(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern5.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^(([^:/?#]+):)(//([^/?#]*))([^?#]*)(\\?([^#]*))?(#(.*))?"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate63.errors = vErrors;
  return errors === 0;
}
function validate58(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "type"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.hostname !== undefined) {
      if (!validate59(data.hostname, {
        instancePath: instancePath + "/hostname",
        parentData: data,
        parentDataProperty: "hostname",
        rootData
      })) {
        vErrors = vErrors === null ? validate59.errors : vErrors.concat(validate59.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (!validate61(data.type, {
        instancePath: instancePath + "/type",
        parentData: data,
        parentDataProperty: "type",
        rootData
      })) {
        vErrors = vErrors === null ? validate61.errors : vErrors.concat(validate61.errors);
        errors = vErrors.length;
      }
    }
    if (data.uri !== undefined) {
      if (!validate63(data.uri, {
        instancePath: instancePath + "/uri",
        parentData: data,
        parentDataProperty: "uri",
        rootData
      })) {
        vErrors = vErrors === null ? validate63.errors : vErrors.concat(validate63.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate58.errors = vErrors;
  return errors === 0;
}
function validate57(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "array"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    if (data.length > 5) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxItems",
        keyword: "maxItems",
        params: {
          limit: 5
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate58(data[i0], {
        instancePath: instancePath + "/" + i0,
        parentData: data,
        parentDataProperty: i0,
        rootData
      })) {
        vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
        errors = vErrors.length;
      }
    }
  }
  validate57.errors = vErrors;
  return errors === 0;
}
const schema29 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^(System|([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/([A-Za-z0-9][-A-Za-z0-9_.]{0,61})?[A-Za-z0-9]))$",
  "type": "string",
  "nullable": true
};
const pattern6 = new RegExp("^(System|([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/([A-Za-z0-9][-A-Za-z0-9_.]{0,61})?[A-Za-z0-9]))$", "u");
function validate67(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern6.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^(System|([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/([A-Za-z0-9][-A-Za-z0-9_.]{0,61})?[A-Za-z0-9]))$"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate67.errors = vErrors;
  return errors === 0;
}
function validate47(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.hostname === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "hostname"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.caCertificateRefs !== undefined) {
      if (!validate48(data.caCertificateRefs, {
        instancePath: instancePath + "/caCertificateRefs",
        parentData: data,
        parentDataProperty: "caCertificateRefs",
        rootData
      })) {
        vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostname !== undefined) {
      if (!validate55(data.hostname, {
        instancePath: instancePath + "/hostname",
        parentData: data,
        parentDataProperty: "hostname",
        rootData
      })) {
        vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
        errors = vErrors.length;
      }
    }
    if (data.subjectAltNames !== undefined) {
      if (!validate57(data.subjectAltNames, {
        instancePath: instancePath + "/subjectAltNames",
        parentData: data,
        parentDataProperty: "subjectAltNames",
        rootData
      })) {
        vErrors = vErrors === null ? validate57.errors : vErrors.concat(validate57.errors);
        errors = vErrors.length;
      }
    }
    if (data.wellKnownCACertificates !== undefined) {
      if (!validate67(data.wellKnownCACertificates, {
        instancePath: instancePath + "/wellKnownCACertificates",
        parentData: data,
        parentDataProperty: "wellKnownCACertificates",
        rootData
      })) {
        vErrors = vErrors === null ? validate67.errors : vErrors.concat(validate67.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate47.errors = vErrors;
  return errors === 0;
}
function validate34(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.targetRefs === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "targetRefs"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.validation === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "validation"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.options !== undefined) {
      if (!validate35(data.options, {
        instancePath: instancePath + "/options",
        parentData: data,
        parentDataProperty: "options",
        rootData
      })) {
        vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
        errors = vErrors.length;
      }
    }
    if (data.targetRefs !== undefined) {
      if (!validate39(data.targetRefs, {
        instancePath: instancePath + "/targetRefs",
        parentData: data,
        parentDataProperty: "targetRefs",
        rootData
      })) {
        vErrors = vErrors === null ? validate39.errors : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.validation !== undefined) {
      if (!validate47(data.validation, {
        instancePath: instancePath + "/validation",
        parentData: data,
        parentDataProperty: "validation",
        rootData
      })) {
        vErrors = vErrors === null ? validate47.errors : vErrors.concat(validate47.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate34.errors = vErrors;
  return errors === 0;
}
const schema30 = {
  "properties": {
    "ancestors": {
      "$ref": "phToqPIHndHpbkY2LuiC1S6r9UINPJGaqejopywMwA"
    }
  },
  "required": ["ancestors"],
  "type": "object",
  "nullable": true
};
const schema31 = {
  "items": {
    "$ref": "C4teu5MrjcWQ2Djt7D5kfcsZSVDzoQk3mhv5KHwNhk"
  },
  "maxItems": 16,
  "type": "array"
};
const schema32 = {
  "properties": {
    "ancestorRef": {
      "$ref": "6OL9KnayuSUKfa0GUggfLIlTljNoUn0Tq3gU8WPySA"
    },
    "conditions": {
      "$ref": "WYHbedb0b02IP2UfPw98Q3pkosNuKHhgRY0Nzifg9KI"
    },
    "controllerName": {
      "$ref": "iGWusDQQmpSGrTc0170EyshjWaXO6sUO7vnsg1tdU0"
    }
  },
  "required": ["ancestorRef", "conditions", "controllerName"],
  "type": "object"
};
const schema33 = {
  "properties": {
    "group": {
      "$ref": "cXGSnALZyUgBgnh89dqRQbsoFIQilEYoTi5V3oxZPk"
    },
    "kind": {
      "$ref": "QzR06pyp71rZYI1UmzzoGLXj42t3xxeQFWQVfFFLk"
    },
    "name": {
      "$ref": "xwpijLRhjUEJllEse3cgJuQz6UsEYqfhm0t12sQjFe4"
    },
    "namespace": {
      "$ref": "Akj54RI3dyfFlv1La3cxax8Lq4MO2H4UuEjMhXZW4"
    },
    "port": {
      "$ref": "XSqJnsnn9eCvoQUP3Zjqm9I885uExDmL7oTSsIvewTI"
    },
    "sectionName": {
      "$ref": "q9ca0KFEUM7TMEh4mWmmFYB0OWEZN7fGsG5EzZTrt8"
    }
  },
  "required": ["name"],
  "type": "object"
};
const schema34 = {
  "default": "gateway.networking.k8s.io",
  "maxLength": 253,
  "pattern": "^$|^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$",
  "type": "string",
  "nullable": true
};
function validate75(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern0.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^$|^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  }
  validate75.errors = vErrors;
  return errors === 0;
}
const schema35 = {
  "default": "Gateway",
  "maxLength": 63,
  "minLength": 1,
  "pattern": "^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$",
  "type": "string",
  "nullable": true
};
function validate77(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 63) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 63
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern1.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate77.errors = vErrors;
  return errors === 0;
}
const schema36 = {
  "maxLength": 63,
  "minLength": 1,
  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$",
  "type": "string",
  "nullable": true
};
const pattern9 = new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$", "u");
function validate80(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func2(data) > 63) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 63
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err2 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!pattern9.test(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate80.errors = vErrors;
  return errors === 0;
}
const schema37 = {
  "format": "int32",
  "type": "integer",
  "minimum": 1,
  "maximum": 65535,
  "nullable": true
};
const formats0 = formats.int32;
function validate82(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && !(data % 1) && !isNaN(data) && isFinite(data)) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "integer"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data == "number" && isFinite(data)) {
    if (data > 65535 || isNaN(data)) {
      const err1 = {
        instancePath,
        schemaPath: "#/maximum",
        keyword: "maximum",
        params: {
          comparison: "<=",
          limit: 65535
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data < 1 || isNaN(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/minimum",
        keyword: "minimum",
        params: {
          comparison: ">=",
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (!formats0.validate(data)) {
      const err3 = {
        instancePath,
        schemaPath: "#/format",
        keyword: "format",
        params: {
          format: "int32"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
  }
  validate82.errors = vErrors;
  return errors === 0;
}
function validate74(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "name"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.group !== undefined) {
      if (!validate75(data.group, {
        instancePath: instancePath + "/group",
        parentData: data,
        parentDataProperty: "group",
        rootData
      })) {
        vErrors = vErrors === null ? validate75.errors : vErrors.concat(validate75.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (!validate77(data.kind, {
        instancePath: instancePath + "/kind",
        parentData: data,
        parentDataProperty: "kind",
        rootData
      })) {
        vErrors = vErrors === null ? validate77.errors : vErrors.concat(validate77.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (!validate23(data.name, {
        instancePath: instancePath + "/name",
        parentData: data,
        parentDataProperty: "name",
        rootData
      })) {
        vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
    if (data.namespace !== undefined) {
      if (!validate80(data.namespace, {
        instancePath: instancePath + "/namespace",
        parentData: data,
        parentDataProperty: "namespace",
        rootData
      })) {
        vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
        errors = vErrors.length;
      }
    }
    if (data.port !== undefined) {
      if (!validate82(data.port, {
        instancePath: instancePath + "/port",
        parentData: data,
        parentDataProperty: "port",
        rootData
      })) {
        vErrors = vErrors === null ? validate82.errors : vErrors.concat(validate82.errors);
        errors = vErrors.length;
      }
    }
    if (data.sectionName !== undefined) {
      if (!validate24(data.sectionName, {
        instancePath: instancePath + "/sectionName",
        parentData: data,
        parentDataProperty: "sectionName",
        rootData
      })) {
        vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate74.errors = vErrors;
  return errors === 0;
}
const schema38 = {
  "items": {
    "$ref": "qF2xzAbTxVDKuLvsNu75Dkz2iJf8KcuXclF0tKipnn0"
  },
  "maxItems": 8,
  "minItems": 1,
  "type": "array"
};
const schema39 = {
  "properties": {
    "lastTransitionTime": {
      "$ref": "KrhXBWKB1pK8JptMQRXbBg5co4bpZWZnIUkdeEo37wY"
    },
    "message": {
      "$ref": "Kduwl8DcA0kMznK9kNMJ5ZDKDZL9GH04F46AbIesag"
    },
    "observedGeneration": {
      "$ref": "Sg5VMnp9PeciTWOOocDxVZ8KL974mKlNPE7Z3LxfFY"
    },
    "reason": {
      "$ref": "ffwvxWNmgAw4j3J98OozNWe0YovCdcCVbNeffpYY"
    },
    "status": {
      "$ref": "pxfc6xQekz8UJRTLhQQLAy8qHcx9lW4EsDEEbdf5fxA"
    },
    "type": {
      "$ref": "abwpMDY1BocHdDN72xQbiDERuNabmToRz3D0GKn0D4"
    }
  },
  "required": ["lastTransitionTime", "message", "reason", "status", "type"],
  "type": "object"
};
const schema40 = {
  "format": "date-time",
  "type": "string"
};
const formats2 = formats["date-time"];
function validate88(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (!formats2.validate(data)) {
      const err0 = {
        instancePath,
        schemaPath: "#/format",
        keyword: "format",
        params: {
          format: "date-time"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate88.errors = vErrors;
  return errors === 0;
}
const schema41 = {
  "maxLength": 32768,
  "type": "string"
};
function validate90(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 32768) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 32768
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate90.errors = vErrors;
  return errors === 0;
}
const schema42 = {
  "format": "int64",
  "type": "integer",
  "minimum": 0,
  "nullable": true
};
const formats4 = formats.int64;
function validate92(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && !(data % 1) && !isNaN(data) && isFinite(data)) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "integer"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data == "number" && isFinite(data)) {
    if (data < 0 || isNaN(data)) {
      const err1 = {
        instancePath,
        schemaPath: "#/minimum",
        keyword: "minimum",
        params: {
          comparison: ">=",
          limit: 0
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!formats4.validate(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/format",
        keyword: "format",
        params: {
          format: "int64"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  }
  validate92.errors = vErrors;
  return errors === 0;
}
const schema43 = {
  "maxLength": 1024,
  "minLength": 1,
  "pattern": "^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$",
  "type": "string"
};
const pattern10 = new RegExp("^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$", "u");
function validate94(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 1024) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 1024
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern10.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate94.errors = vErrors;
  return errors === 0;
}
const schema44 = {
  "enum": ["True", "False", "Unknown"],
  "type": "string"
};
function validate96(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "True" || data === "False" || data === "Unknown")) {
    const err1 = {
      instancePath,
      schemaPath: "#/enum",
      keyword: "enum",
      params: {
        allowedValues: schema44.enum
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate96.errors = vErrors;
  return errors === 0;
}
const schema45 = {
  "maxLength": 316,
  "pattern": "^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$",
  "type": "string"
};
const pattern11 = new RegExp("^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$", "u");
function validate98(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 316) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 316
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (!pattern11.test(data)) {
      const err1 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate98.errors = vErrors;
  return errors === 0;
}
function validate87(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.lastTransitionTime === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "lastTransitionTime"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "message"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.reason === undefined) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "reason"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.status === undefined) {
      const err3 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "status"
        }
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.type === undefined) {
      const err4 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "type"
        }
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.lastTransitionTime !== undefined) {
      if (!validate88(data.lastTransitionTime, {
        instancePath: instancePath + "/lastTransitionTime",
        parentData: data,
        parentDataProperty: "lastTransitionTime",
        rootData
      })) {
        vErrors = vErrors === null ? validate88.errors : vErrors.concat(validate88.errors);
        errors = vErrors.length;
      }
    }
    if (data.message !== undefined) {
      if (!validate90(data.message, {
        instancePath: instancePath + "/message",
        parentData: data,
        parentDataProperty: "message",
        rootData
      })) {
        vErrors = vErrors === null ? validate90.errors : vErrors.concat(validate90.errors);
        errors = vErrors.length;
      }
    }
    if (data.observedGeneration !== undefined) {
      if (!validate92(data.observedGeneration, {
        instancePath: instancePath + "/observedGeneration",
        parentData: data,
        parentDataProperty: "observedGeneration",
        rootData
      })) {
        vErrors = vErrors === null ? validate92.errors : vErrors.concat(validate92.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== undefined) {
      if (!validate94(data.reason, {
        instancePath: instancePath + "/reason",
        parentData: data,
        parentDataProperty: "reason",
        rootData
      })) {
        vErrors = vErrors === null ? validate94.errors : vErrors.concat(validate94.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (!validate96(data.status, {
        instancePath: instancePath + "/status",
        parentData: data,
        parentDataProperty: "status",
        rootData
      })) {
        vErrors = vErrors === null ? validate96.errors : vErrors.concat(validate96.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (!validate98(data.type, {
        instancePath: instancePath + "/type",
        parentData: data,
        parentDataProperty: "type",
        rootData
      })) {
        vErrors = vErrors === null ? validate98.errors : vErrors.concat(validate98.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err5 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate87.errors = vErrors;
  return errors === 0;
}
function validate86(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 8) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxItems",
        keyword: "maxItems",
        params: {
          limit: 8
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.length < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minItems",
        keyword: "minItems",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate87(data[i0], {
        instancePath: instancePath + "/" + i0,
        parentData: data,
        parentDataProperty: i0,
        rootData
      })) {
        vErrors = vErrors === null ? validate87.errors : vErrors.concat(validate87.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "array"
      }
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate86.errors = vErrors;
  return errors === 0;
}
const schema46 = {
  "maxLength": 253,
  "minLength": 1,
  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*\\/[A-Za-z0-9\\/\\-._~%!$&'()*+,;=:]+$",
  "type": "string"
};
const pattern12 = new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*\\/[A-Za-z0-9\\/\\-._~%!$&'()*+,;=:]+$", "u");
function validate102(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 253) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: {
          limit: 253
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: {
          limit: 1
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern12.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: {
          pattern: "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*\\/[A-Za-z0-9\\/\\-._~%!$&'()*+,;=:]+$"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "string"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate102.errors = vErrors;
  return errors === 0;
}
function validate73(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.ancestorRef === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "ancestorRef"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.conditions === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "conditions"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.controllerName === undefined) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "controllerName"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.ancestorRef !== undefined) {
      if (!validate74(data.ancestorRef, {
        instancePath: instancePath + "/ancestorRef",
        parentData: data,
        parentDataProperty: "ancestorRef",
        rootData
      })) {
        vErrors = vErrors === null ? validate74.errors : vErrors.concat(validate74.errors);
        errors = vErrors.length;
      }
    }
    if (data.conditions !== undefined) {
      if (!validate86(data.conditions, {
        instancePath: instancePath + "/conditions",
        parentData: data,
        parentDataProperty: "conditions",
        rootData
      })) {
        vErrors = vErrors === null ? validate86.errors : vErrors.concat(validate86.errors);
        errors = vErrors.length;
      }
    }
    if (data.controllerName !== undefined) {
      if (!validate102(data.controllerName, {
        instancePath: instancePath + "/controllerName",
        parentData: data,
        parentDataProperty: "controllerName",
        rootData
      })) {
        vErrors = vErrors === null ? validate102.errors : vErrors.concat(validate102.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate73.errors = vErrors;
  return errors === 0;
}
function validate72(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 16) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxItems",
        keyword: "maxItems",
        params: {
          limit: 16
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate73(data[i0], {
        instancePath: instancePath + "/" + i0,
        parentData: data,
        parentDataProperty: i0,
        rootData
      })) {
        vErrors = vErrors === null ? validate73.errors : vErrors.concat(validate73.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "array"
      }
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate72.errors = vErrors;
  return errors === 0;
}
function validate71(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(data && typeof data == "object" && !Array.isArray(data)) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.ancestors === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "ancestors"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.ancestors !== undefined) {
      if (!validate72(data.ancestors, {
        instancePath: instancePath + "/ancestors",
        parentData: data,
        parentDataProperty: "ancestors",
        rootData
      })) {
        vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
  }
  validate71.errors = vErrors;
  return errors === 0;
}
function validate25(data, {
  instancePath = "",
  parentData,
  parentDataProperty,
  rootData = data
} = {}) {
  /*# sourceURL="gateway.networking.k8s.io.v1.BackendTLSPolicy" */;
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.spec === undefined) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "spec"
        }
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.apiVersion === undefined) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "apiVersion"
        }
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind === undefined) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: {
          missingProperty: "kind"
        }
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.apiVersion !== undefined) {
      if (!validate26(data.apiVersion, {
        instancePath: instancePath + "/apiVersion",
        parentData: data,
        parentDataProperty: "apiVersion",
        rootData
      })) {
        vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (!validate28(data.kind, {
        instancePath: instancePath + "/kind",
        parentData: data,
        parentDataProperty: "kind",
        rootData
      })) {
        vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (!validate30(data.metadata, {
        instancePath: instancePath + "/metadata",
        parentData: data,
        parentDataProperty: "metadata",
        rootData
      })) {
        vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
        errors = vErrors.length;
      }
    }
    if (data.spec !== undefined) {
      if (!validate34(data.spec, {
        instancePath: instancePath + "/spec",
        parentData: data,
        parentDataProperty: "spec",
        rootData
      })) {
        vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (!validate71(data.status, {
        instancePath: instancePath + "/status",
        parentData: data,
        parentDataProperty: "status",
        rootData
      })) {
        vErrors = vErrors === null ? validate71.errors : vErrors.concat(validate71.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: {
        type: "object"
      }
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate25.errors = vErrors;
  return errors === 0;
}