import { formats } from '@kubernetes-models/validate';
export const validate = validate39;
const schema16 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: '7H7QTLHWjsW4ORrCnkHX3WahQAZYEwSG5D7kdY2U',
    },
    kind: {
      $ref: 'vq2nyXxBftjuBnW78uRHjewVi8nyQMO8CfvvnGx7uR4',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'f52w7hhs1kNMC8zZjSgbqQnQbD4t2Yw8AXghtRCMio',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1beta1.StepAction',
};
const schema17 = {
  type: 'string',
  enum: ['tekton.dev/v1beta1'],
};
function validate40(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'string') {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === 'tekton.dev/v1beta1')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema17.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate40.errors = vErrors;
  return errors === 0;
}
const schema18 = {
  type: 'string',
  enum: ['StepAction'],
};
function validate42(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'string') {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === 'StepAction')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema18.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate42.errors = vErrors;
  return errors === 0;
}
const schema19 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema20 = {};

import { validate as validate45 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate44(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate45(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate45.errors
          : vErrors.concat(validate45.errors);
      errors = vErrors.length;
    }
  }
  validate44.errors = vErrors;
  return errors === 0;
}
const schema21 = {
  type: 'object',
  properties: {
    args: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    image: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'MsDfZiS2fo9sPJDPqOjQKErAOp9nZCZ3K5fk3DRqIA',
    },
    results: {
      $ref: 'XgbPVW20J18CwYMougeH72NTTjeYQpsqvmVdHowTTI',
    },
    script: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    securityContext: {
      $ref: 'ksODhjuQNaLDjLrDzCcran1NV6hbQ2VKWbCcaLbDgk',
    },
    volumeMounts: {
      $ref: 'MwEW3cXYTOIY2SDIx0pDe3kixu4eIgg9HqehegFCM',
    },
    workingDir: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
const schema6 = {
  type: 'array',
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  nullable: true,
};
const schema7 = {
  type: 'string',
};
function validate22(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'string') {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
function validate21(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'array',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate22(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
  }
  validate21.errors = vErrors;
  return errors === 0;
}
const schema22 = {
  type: 'array',
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  nullable: true,
};
const schema23 = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    value: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    valueFrom: {
      $ref: 'nR8Rt3Tt9hVGrsSHp4EhrwirJaOR3jbBEeLhvCtrJg',
    },
  },
};
const schema8 = {
  type: 'string',
  nullable: true,
};
function validate24(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'string' && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate24.errors = vErrors;
  return errors === 0;
}
const schema24 = {
  type: 'object',
  properties: {
    configMapKeyRef: {
      $ref: 'kyPWonKd9RiqYcLV5gZX8H1ko7ZDPDNnaoO3ShQds',
    },
    fieldRef: {
      $ref: 'B5jNtau7CpFJjYJrsYhyzxmI9XsIag7F9u7xksrgmQk',
    },
    resourceFieldRef: {
      $ref: 'D7PNj4ec9vScD68sAz7HLGzoBiyO7djP09KZXUzl2Y4',
    },
    secretKeyRef: {
      $ref: 'kyPWonKd9RiqYcLV5gZX8H1ko7ZDPDNnaoO3ShQds',
    },
  },
  nullable: true,
};
const schema9 = {
  type: 'object',
  required: ['key'],
  properties: {
    key: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  nullable: true,
};
const schema10 = {
  type: 'string',
  default: '',
  nullable: true,
};
function validate27(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'string' && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate27.errors = vErrors;
  return errors === 0;
}
const schema11 = {
  type: 'boolean',
  nullable: true,
};
function validate29(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== 'boolean' && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'boolean',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate29.errors = vErrors;
  return errors === 0;
}
function validate25(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.key === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'key',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.key !== undefined) {
      if (
        !validate22(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate27(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate27.errors
            : vErrors.concat(validate27.errors);
        errors = vErrors.length;
      }
    }
    if (data.optional !== undefined) {
      if (
        !validate29(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
  }
  validate25.errors = vErrors;
  return errors === 0;
}
const schema25 = {
  type: 'object',
  required: ['fieldPath'],
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    fieldPath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  nullable: true,
};
function validate57(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.fieldPath === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'fieldPath',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.apiVersion !== undefined) {
      if (
        !validate24(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.fieldPath !== undefined) {
      if (
        !validate22(data.fieldPath, {
          instancePath: instancePath + '/fieldPath',
          parentData: data,
          parentDataProperty: 'fieldPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
  }
  validate57.errors = vErrors;
  return errors === 0;
}
const schema26 = {
  type: 'object',
  required: ['resource'],
  properties: {
    containerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    divisor: {
      $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
    },
    resource: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  nullable: true,
};
const schema27 = {
  pattern:
    '^(\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))))?$',
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
};
const schema28 = {
  type: 'integer',
};
function validate64(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(typeof data == 'number' && !(data % 1) && !isNaN(data) && isFinite(data))
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'integer',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate64.errors = vErrors;
  return errors === 0;
}
const pattern0 =
  /^(\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))))?$/u;
function validate63(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate64(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate64.errors : vErrors.concat(validate64.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs2 = errors;
    if (
      !validate22(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate22.errors
          : vErrors.concat(validate22.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs2 === errors;
    valid0 = valid0 || _valid0;
  }
  if (!valid0) {
    const err0 = {
      instancePath,
      schemaPath: '#/anyOf',
      keyword: 'anyOf',
      params: {},
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  if (typeof data === 'string') {
    if (!pattern0.test(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/pattern',
        keyword: 'pattern',
        params: {
          pattern:
            '^(\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))))?$',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  validate63.errors = vErrors;
  return errors === 0;
}
function validate61(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.resource === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'resource',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.containerName !== undefined) {
      if (
        !validate24(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.divisor !== undefined) {
      if (
        !validate63(data.divisor, {
          instancePath: instancePath + '/divisor',
          parentData: data,
          parentDataProperty: 'divisor',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate63.errors
            : vErrors.concat(validate63.errors);
        errors = vErrors.length;
      }
    }
    if (data.resource !== undefined) {
      if (
        !validate22(data.resource, {
          instancePath: instancePath + '/resource',
          parentData: data,
          parentDataProperty: 'resource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
  }
  validate61.errors = vErrors;
  return errors === 0;
}
function validate55(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.configMapKeyRef !== undefined) {
      if (
        !validate25(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate25.errors
            : vErrors.concat(validate25.errors);
        errors = vErrors.length;
      }
    }
    if (data.fieldRef !== undefined) {
      if (
        !validate57(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate57.errors
            : vErrors.concat(validate57.errors);
        errors = vErrors.length;
      }
    }
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate61(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate61.errors
            : vErrors.concat(validate61.errors);
        errors = vErrors.length;
      }
    }
    if (data.secretKeyRef !== undefined) {
      if (
        !validate25(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate25.errors
            : vErrors.concat(validate25.errors);
        errors = vErrors.length;
      }
    }
  }
  validate55.errors = vErrors;
  return errors === 0;
}
function validate52(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (
        !validate22(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== undefined) {
      if (
        !validate24(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.valueFrom !== undefined) {
      if (
        !validate55(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate55.errors
            : vErrors.concat(validate55.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate52.errors = vErrors;
  return errors === 0;
}
function validate51(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'array',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate52(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate52.errors
            : vErrors.concat(validate52.errors);
        errors = vErrors.length;
      }
    }
  }
  validate51.errors = vErrors;
  return errors === 0;
}
const schema29 = {
  type: 'array',
  items: {
    $ref: 'CubDNCGD0a691SjxZVe1ELttRW6Lby7ZJEo4gOU',
  },
  nullable: true,
};
const schema30 = {
  type: 'object',
  required: ['name'],
  properties: {
    default: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    enum: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    properties: {
      $ref: '9dEk2piPBIO1htGkwcBYCaQyRlsnnF2UQ9BIosfTI',
    },
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
const schema31 = {};
function validate77(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  validate77.errors = null;
  return true;
}
const schema12 = {
  type: 'object',
  additionalProperties: {
    $ref: '12bGl5SorwtEAV7svcAR515UJ3gXm6T8AH6G7ywQ',
  },
  properties: {},
  nullable: true,
};
const schema13 = {
  type: 'object',
  properties: {
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate32(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.type !== undefined) {
      if (
        !validate24(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate32.errors = vErrors;
  return errors === 0;
}
function validate31(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    for (const key0 in data) {
      if (
        !validate32(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate32.errors
            : vErrors.concat(validate32.errors);
        errors = vErrors.length;
      }
    }
  }
  validate31.errors = vErrors;
  return errors === 0;
}
function validate76(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.default !== undefined) {
      if (
        !validate77(data.default, {
          instancePath: instancePath + '/default',
          parentData: data,
          parentDataProperty: 'default',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate77.errors
            : vErrors.concat(validate77.errors);
        errors = vErrors.length;
      }
    }
    if (data.enum !== undefined) {
      if (
        !validate21(data.enum, {
          instancePath: instancePath + '/enum',
          parentData: data,
          parentDataProperty: 'enum',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate21.errors
            : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate22(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.properties !== undefined) {
      if (
        !validate31(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate31.errors
            : vErrors.concat(validate31.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate24(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate76.errors = vErrors;
  return errors === 0;
}
function validate75(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'array',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate76(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate76.errors
            : vErrors.concat(validate76.errors);
        errors = vErrors.length;
      }
    }
  }
  validate75.errors = vErrors;
  return errors === 0;
}
const schema32 = {
  type: 'array',
  items: {
    $ref: 'QmNiMvHAKpVlhCzW7RrhzkIVmJq1SAWW3tht7K95I',
  },
  nullable: true,
};
const schema33 = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    properties: {
      $ref: '9dEk2piPBIO1htGkwcBYCaQyRlsnnF2UQ9BIosfTI',
    },
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate86(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (
        !validate22(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.properties !== undefined) {
      if (
        !validate31(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate31.errors
            : vErrors.concat(validate31.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate24(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate86.errors = vErrors;
  return errors === 0;
}
function validate85(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'array',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate86(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate86.errors
            : vErrors.concat(validate86.errors);
        errors = vErrors.length;
      }
    }
  }
  validate85.errors = vErrors;
  return errors === 0;
}
const schema34 = {
  type: 'object',
  properties: {
    allowPrivilegeEscalation: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    appArmorProfile: {
      $ref: 'YbnajYi6rBqhVSaUKuHSP0DlX7N4UdiS6tIv3THy4',
    },
    capabilities: {
      $ref: 'YMgmBIl6G2AJbxo7TKvMvLiTTIxtMfc8CdiHqBKE',
    },
    privileged: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    procMount: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnlyRootFilesystem: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    runAsGroup: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    runAsNonRoot: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    runAsUser: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    seLinuxOptions: {
      $ref: 'HxCShOIxXvAeZcVxGCTBWSblLv24k535dp3HuWUtqq0',
    },
    seccompProfile: {
      $ref: 'YbnajYi6rBqhVSaUKuHSP0DlX7N4UdiS6tIv3THy4',
    },
    windowsOptions: {
      $ref: 'sWfrXDJM9xHwLEX7HYTegXP1RJ5T3eXzwt07iJjKI',
    },
  },
  nullable: true,
};
const schema15 = {
  type: 'object',
  required: ['type'],
  properties: {
    localhostProfile: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  nullable: true,
};
function validate36(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.type === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'type',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.localhostProfile !== undefined) {
      if (
        !validate24(data.localhostProfile, {
          instancePath: instancePath + '/localhostProfile',
          parentData: data,
          parentDataProperty: 'localhostProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate22(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
  }
  validate36.errors = vErrors;
  return errors === 0;
}
const schema35 = {
  type: 'object',
  properties: {
    add: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    drop: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  nullable: true,
};
function validate96(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.add !== undefined) {
      if (
        !validate21(data.add, {
          instancePath: instancePath + '/add',
          parentData: data,
          parentDataProperty: 'add',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate21.errors
            : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.drop !== undefined) {
      if (
        !validate21(data.drop, {
          instancePath: instancePath + '/drop',
          parentData: data,
          parentDataProperty: 'drop',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate21.errors
            : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  }
  validate96.errors = vErrors;
  return errors === 0;
}
const schema14 = {
  type: 'integer',
  format: 'int64',
  nullable: true,
};
const formats0 = formats.int64;
function validate35(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(
      typeof data == 'number' &&
      !(data % 1) &&
      !isNaN(data) &&
      isFinite(data)
    ) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'integer',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data == 'number' && isFinite(data)) {
    if (!formats0.validate(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'int64',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  validate35.errors = vErrors;
  return errors === 0;
}
const schema36 = {
  type: 'object',
  properties: {
    level: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    role: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    user: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate106(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.level !== undefined) {
      if (
        !validate24(data.level, {
          instancePath: instancePath + '/level',
          parentData: data,
          parentDataProperty: 'level',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.role !== undefined) {
      if (
        !validate24(data.role, {
          instancePath: instancePath + '/role',
          parentData: data,
          parentDataProperty: 'role',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate24(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== undefined) {
      if (
        !validate24(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  }
  validate106.errors = vErrors;
  return errors === 0;
}
const schema37 = {
  type: 'object',
  properties: {
    gmsaCredentialSpec: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    gmsaCredentialSpecName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    hostProcess: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    runAsUserName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate113(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.gmsaCredentialSpec !== undefined) {
      if (
        !validate24(data.gmsaCredentialSpec, {
          instancePath: instancePath + '/gmsaCredentialSpec',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.gmsaCredentialSpecName !== undefined) {
      if (
        !validate24(data.gmsaCredentialSpecName, {
          instancePath: instancePath + '/gmsaCredentialSpecName',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpecName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostProcess !== undefined) {
      if (
        !validate29(data.hostProcess, {
          instancePath: instancePath + '/hostProcess',
          parentData: data,
          parentDataProperty: 'hostProcess',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.runAsUserName !== undefined) {
      if (
        !validate24(data.runAsUserName, {
          instancePath: instancePath + '/runAsUserName',
          parentData: data,
          parentDataProperty: 'runAsUserName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  }
  validate113.errors = vErrors;
  return errors === 0;
}
function validate93(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.allowPrivilegeEscalation !== undefined) {
      if (
        !validate29(data.allowPrivilegeEscalation, {
          instancePath: instancePath + '/allowPrivilegeEscalation',
          parentData: data,
          parentDataProperty: 'allowPrivilegeEscalation',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.appArmorProfile !== undefined) {
      if (
        !validate36(data.appArmorProfile, {
          instancePath: instancePath + '/appArmorProfile',
          parentData: data,
          parentDataProperty: 'appArmorProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate36.errors
            : vErrors.concat(validate36.errors);
        errors = vErrors.length;
      }
    }
    if (data.capabilities !== undefined) {
      if (
        !validate96(data.capabilities, {
          instancePath: instancePath + '/capabilities',
          parentData: data,
          parentDataProperty: 'capabilities',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate96.errors
            : vErrors.concat(validate96.errors);
        errors = vErrors.length;
      }
    }
    if (data.privileged !== undefined) {
      if (
        !validate29(data.privileged, {
          instancePath: instancePath + '/privileged',
          parentData: data,
          parentDataProperty: 'privileged',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.procMount !== undefined) {
      if (
        !validate24(data.procMount, {
          instancePath: instancePath + '/procMount',
          parentData: data,
          parentDataProperty: 'procMount',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnlyRootFilesystem !== undefined) {
      if (
        !validate29(data.readOnlyRootFilesystem, {
          instancePath: instancePath + '/readOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'readOnlyRootFilesystem',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.runAsGroup !== undefined) {
      if (
        !validate35(data.runAsGroup, {
          instancePath: instancePath + '/runAsGroup',
          parentData: data,
          parentDataProperty: 'runAsGroup',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate35.errors
            : vErrors.concat(validate35.errors);
        errors = vErrors.length;
      }
    }
    if (data.runAsNonRoot !== undefined) {
      if (
        !validate29(data.runAsNonRoot, {
          instancePath: instancePath + '/runAsNonRoot',
          parentData: data,
          parentDataProperty: 'runAsNonRoot',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.runAsUser !== undefined) {
      if (
        !validate35(data.runAsUser, {
          instancePath: instancePath + '/runAsUser',
          parentData: data,
          parentDataProperty: 'runAsUser',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate35.errors
            : vErrors.concat(validate35.errors);
        errors = vErrors.length;
      }
    }
    if (data.seLinuxOptions !== undefined) {
      if (
        !validate106(data.seLinuxOptions, {
          instancePath: instancePath + '/seLinuxOptions',
          parentData: data,
          parentDataProperty: 'seLinuxOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate106.errors
            : vErrors.concat(validate106.errors);
        errors = vErrors.length;
      }
    }
    if (data.seccompProfile !== undefined) {
      if (
        !validate36(data.seccompProfile, {
          instancePath: instancePath + '/seccompProfile',
          parentData: data,
          parentDataProperty: 'seccompProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate36.errors
            : vErrors.concat(validate36.errors);
        errors = vErrors.length;
      }
    }
    if (data.windowsOptions !== undefined) {
      if (
        !validate113(data.windowsOptions, {
          instancePath: instancePath + '/windowsOptions',
          parentData: data,
          parentDataProperty: 'windowsOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate113.errors
            : vErrors.concat(validate113.errors);
        errors = vErrors.length;
      }
    }
  }
  validate93.errors = vErrors;
  return errors === 0;
}
const schema38 = {
  type: 'array',
  items: {
    $ref: 'SEp18EkqjgXWMJk6uDMmapPUotqVJbrnxhdiX2GuEY',
  },
  nullable: true,
};
const schema39 = {
  type: 'object',
  required: ['mountPath', 'name'],
  properties: {
    mountPath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    mountPropagation: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    recursiveReadOnly: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    subPath: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    subPathExpr: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate121(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.mountPath === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'mountPath',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.mountPath !== undefined) {
      if (
        !validate22(data.mountPath, {
          instancePath: instancePath + '/mountPath',
          parentData: data,
          parentDataProperty: 'mountPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.mountPropagation !== undefined) {
      if (
        !validate24(data.mountPropagation, {
          instancePath: instancePath + '/mountPropagation',
          parentData: data,
          parentDataProperty: 'mountPropagation',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate22(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate22.errors
            : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnly !== undefined) {
      if (
        !validate29(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate29.errors
            : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
    if (data.recursiveReadOnly !== undefined) {
      if (
        !validate24(data.recursiveReadOnly, {
          instancePath: instancePath + '/recursiveReadOnly',
          parentData: data,
          parentDataProperty: 'recursiveReadOnly',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.subPath !== undefined) {
      if (
        !validate24(data.subPath, {
          instancePath: instancePath + '/subPath',
          parentData: data,
          parentDataProperty: 'subPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.subPathExpr !== undefined) {
      if (
        !validate24(data.subPathExpr, {
          instancePath: instancePath + '/subPathExpr',
          parentData: data,
          parentDataProperty: 'subPathExpr',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate121.errors = vErrors;
  return errors === 0;
}
function validate120(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (!Array.isArray(data) && data !== null) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'array',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate121(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate121.errors
            : vErrors.concat(validate121.errors);
        errors = vErrors.length;
      }
    }
  }
  validate120.errors = vErrors;
  return errors === 0;
}
function validate48(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (
    !(data && typeof data == 'object' && !Array.isArray(data)) &&
    data !== null
  ) {
    const err0 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.args !== undefined) {
      if (
        !validate21(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate21.errors
            : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.command !== undefined) {
      if (
        !validate21(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate21.errors
            : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.env !== undefined) {
      if (
        !validate51(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate51.errors
            : vErrors.concat(validate51.errors);
        errors = vErrors.length;
      }
    }
    if (data.image !== undefined) {
      if (
        !validate24(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.params !== undefined) {
      if (
        !validate75(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate75.errors
            : vErrors.concat(validate75.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate85(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate85.errors
            : vErrors.concat(validate85.errors);
        errors = vErrors.length;
      }
    }
    if (data.script !== undefined) {
      if (
        !validate24(data.script, {
          instancePath: instancePath + '/script',
          parentData: data,
          parentDataProperty: 'script',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
    if (data.securityContext !== undefined) {
      if (
        !validate93(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate93.errors
            : vErrors.concat(validate93.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeMounts !== undefined) {
      if (
        !validate120(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate120.errors
            : vErrors.concat(validate120.errors);
        errors = vErrors.length;
      }
    }
    if (data.workingDir !== undefined) {
      if (
        !validate24(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate24.errors
            : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  }
  validate48.errors = vErrors;
  return errors === 0;
}
function validate39(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1beta1.StepAction" */
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.apiVersion === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'apiVersion',
        },
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
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'kind',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.apiVersion !== undefined) {
      if (
        !validate40(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate40.errors
            : vErrors.concat(validate40.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate42(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate42.errors
            : vErrors.concat(validate42.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate44(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate44.errors
            : vErrors.concat(validate44.errors);
        errors = vErrors.length;
      }
    }
    if (data.spec !== undefined) {
      if (
        !validate48(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate48.errors
            : vErrors.concat(validate48.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
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
