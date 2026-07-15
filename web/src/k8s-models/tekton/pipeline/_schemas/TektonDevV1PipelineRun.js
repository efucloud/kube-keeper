import { formats } from '@kubernetes-models/validate';
export const validate = validate162;
const schema53 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'wgZDK9uwuXoeAzLqnWqrq0y9h754fMvBk39QXQsdw',
    },
    kind: {
      $ref: 'vhnCnN5e62Tqnene8UlIZcFJaVOxmerlYRnqGXqpRPo',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'rzXqbY99PnqmV8rVhnS5TUMUNC2NoGnAwJNUq5Ay50c',
    },
    status: {
      $ref: '1P24Sgvw7DfTpiDhUsxK5XK1Tlne7xESwShG7LJWxY',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1.PipelineRun',
};
const schema54 = {
  type: 'string',
  enum: ['tekton.dev/v1'],
};
function validate163(
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
  if (!(data === 'tekton.dev/v1')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema54.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate163.errors = vErrors;
  return errors === 0;
}
const schema55 = {
  type: 'string',
  enum: ['PipelineRun'],
};
function validate165(
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
  if (!(data === 'PipelineRun')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema55.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate165.errors = vErrors;
  return errors === 0;
}
const schema56 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema57 = {};

import { validate as validate168 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate167(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate168(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate168.errors
          : vErrors.concat(validate168.errors);
      errors = vErrors.length;
    }
  }
  validate167.errors = vErrors;
  return errors === 0;
}
const schema58 = {
  type: 'object',
  properties: {
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    pipelineRef: {
      $ref: 'ncTQRUCSMoxaue3wJdC8xWA9kzq8MAOS8Hf1dtoJpg',
    },
    pipelineSpec: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    status: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    taskRunSpecs: {
      $ref: 'rYXh7LqrY5xyBjd2QDRfaAYwcihmU7INOMEYBPCA',
    },
    taskRunTemplate: {
      $ref: 'xgJPGNFQ5x0LG8DInnMjHL4ioH43tnTf6Qg1xwlVg',
    },
    timeouts: {
      $ref: 'yoj1r9wU2qjU93ADgH3bOmMcEOUDPKDRbr52X6XpvE',
    },
    workspaces: {
      $ref: '0SRISnkTJoZ6lNKFacCe8MZS9g4PmJMW4QB4eHIUw',
    },
  },
  nullable: true,
};
const schema7 = {
  type: 'array',
  items: {
    $ref: '9Io3ghMpg6A5V9ui8mWOQtmsEyRmTdvNEMe6HPIU',
  },
  nullable: true,
};
const schema8 = {
  type: 'object',
  required: ['name', 'value'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    value: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
};
const schema9 = {
  type: 'string',
};
function validate24(
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
  validate24.errors = vErrors;
  return errors === 0;
}
const schema10 = {};
function validate26(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  validate26.errors = null;
  return true;
}
function validate23(
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
    if (data.value === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'value',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.value !== undefined) {
      if (
        !validate26(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
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
  validate23.errors = vErrors;
  return errors === 0;
}
function validate22(
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
        !validate23(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate23.errors
            : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
  }
  validate22.errors = vErrors;
  return errors === 0;
}
const schema59 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    resolver: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
const schema6 = {
  type: 'string',
  nullable: true,
};
function validate21(
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
  validate21.errors = vErrors;
  return errors === 0;
}
function validate173(
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
    if (data.apiVersion !== undefined) {
      if (
        !validate21(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
        !validate21(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.params !== undefined) {
      if (
        !validate22(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
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
    if (data.resolver !== undefined) {
      if (
        !validate21(data.resolver, {
          instancePath: instancePath + '/resolver',
          parentData: data,
          parentDataProperty: 'resolver',
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
  validate173.errors = vErrors;
  return errors === 0;
}
const schema60 = {
  type: 'array',
  items: {
    $ref: '1ryRcRrK8ZUNKPZFoR3JL4IKhdB8wAWK8A6TcfYOcI',
  },
  nullable: true,
};
const schema61 = {
  type: 'object',
  properties: {
    computeResources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    metadata: {
      $ref: 'igJYwSZYrBtVsRmcMsQYdB7Q50xFQbahYKwITLXw0',
    },
    pipelineTaskName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    podTemplate: {
      $ref: '8VQBVoto93rwyDOqc4Ic3zpvE15YraSiR1tTv6eVfw',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sidecarSpecs: {
      $ref: 'rKfPrjjPooH5LSSRs6JyPIJc7AHV3axCfmtPcTwE8I',
    },
    stepSpecs: {
      $ref: 'rKfPrjjPooH5LSSRs6JyPIJc7AHV3axCfmtPcTwE8I',
    },
  },
};
const schema62 = {
  type: 'object',
  properties: {
    claims: {
      $ref: 'miM86gTkTxUb3LLkj78AdgRYOzxzjhY2Abx8TjXGY',
    },
    limits: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
    requests: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
  },
  nullable: true,
};
const schema19 = {
  type: 'array',
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  nullable: true,
};
const schema20 = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    request: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate46(
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
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.request !== undefined) {
      if (
        !validate21(data.request, {
          instancePath: instancePath + '/request',
          parentData: data,
          parentDataProperty: 'request',
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
  validate46.errors = vErrors;
  return errors === 0;
}
function validate45(
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
        !validate46(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate46.errors
            : vErrors.concat(validate46.errors);
        errors = vErrors.length;
      }
    }
  }
  validate45.errors = vErrors;
  return errors === 0;
}
const schema11 = {
  type: 'object',
  additionalProperties: {
    $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
  },
  properties: {},
  nullable: true,
};
const schema12 = {
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
const schema13 = {
  type: 'integer',
};
function validate31(
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
  validate31.errors = vErrors;
  return errors === 0;
}
const pattern0 =
  /^(\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))))?$/u;
function validate30(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate31(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs2 = errors;
    if (
      !validate24(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate24.errors
          : vErrors.concat(validate24.errors);
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
  validate30.errors = vErrors;
  return errors === 0;
}
function validate29(
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
        !validate30(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate30.errors
            : vErrors.concat(validate30.errors);
        errors = vErrors.length;
      }
    }
  }
  validate29.errors = vErrors;
  return errors === 0;
}
function validate183(
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
    if (data.claims !== undefined) {
      if (
        !validate45(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate29(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate29(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate183.errors = vErrors;
  return errors === 0;
}
const schema63 = {
  type: 'object',
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    labels: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
  },
  nullable: true,
};
const schema14 = {
  type: 'object',
  additionalProperties: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  properties: {},
  nullable: true,
};
function validate35(
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
        !validate24(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
  validate35.errors = vErrors;
  return errors === 0;
}
function validate188(
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
    if (data.annotations !== undefined) {
      if (
        !validate35(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
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
    if (data.labels !== undefined) {
      if (
        !validate35(data.labels, {
          instancePath: instancePath + '/labels',
          parentData: data,
          parentDataProperty: 'labels',
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
  }
  validate188.errors = vErrors;
  return errors === 0;
}
const schema24 = {
  type: 'object',
  properties: {
    affinity: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    automountServiceAccountToken: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    dnsConfig: {
      $ref: 'MuIQELsc9ogGvxi1N5Z0YKzi8GEYeh1nfmhTlrQQEA',
    },
    dnsPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    enableServiceLinks: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    hostAliases: {
      $ref: '5MWDwEVEHtLj7phXIhfn8FkfVDV2GrmVP2upiAixU',
    },
    hostNetwork: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    imagePullSecrets: {
      $ref: 'wYb0JT25mTSwRer7ZdQj9ETTR3jt94ISSvAy2nuU',
    },
    nodeSelector: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    priorityClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    runtimeClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    schedulerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    securityContext: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    tolerations: {
      $ref: '0n4c9hC8BjWXgqJPcgtzXIbgzIfyT58Oy1pU5nsoec',
    },
    topologySpreadConstraints: {
      $ref: '41mgk2SDFjdQwKv2VPdOODZzv1bDMOctKEj0z6qFY',
    },
    volumes: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
  nullable: true,
};
const schema16 = {
  type: 'boolean',
  nullable: true,
};
function validate39(
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
  validate39.errors = vErrors;
  return errors === 0;
}
const schema25 = {
  type: 'object',
  properties: {
    nameservers: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    options: {
      $ref: '3dFlzwy8zGt7y3hMWXnwInffukRQoHbmEF3xGVNI',
    },
    searches: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  nullable: true,
};
const schema15 = {
  type: 'array',
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  nullable: true,
};
function validate37(
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
        !validate24(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  validate37.errors = vErrors;
  return errors === 0;
}
const schema26 = {
  type: 'array',
  items: {
    $ref: 'sWfncG59c1XfNxmkMXW89j5rdj0YnP54Zpfo5QkH10',
  },
  nullable: true,
};
const schema27 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    value: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate65(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate21(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.value !== undefined) {
      if (
        !validate21(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate65.errors = vErrors;
  return errors === 0;
}
function validate64(
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
        !validate65(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate65.errors
            : vErrors.concat(validate65.errors);
        errors = vErrors.length;
      }
    }
  }
  validate64.errors = vErrors;
  return errors === 0;
}
function validate62(
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
    if (data.nameservers !== undefined) {
      if (
        !validate37(data.nameservers, {
          instancePath: instancePath + '/nameservers',
          parentData: data,
          parentDataProperty: 'nameservers',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
        errors = vErrors.length;
      }
    }
    if (data.options !== undefined) {
      if (
        !validate64(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate64.errors
            : vErrors.concat(validate64.errors);
        errors = vErrors.length;
      }
    }
    if (data.searches !== undefined) {
      if (
        !validate37(data.searches, {
          instancePath: instancePath + '/searches',
          parentData: data,
          parentDataProperty: 'searches',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
        errors = vErrors.length;
      }
    }
  }
  validate62.errors = vErrors;
  return errors === 0;
}
const schema28 = {
  type: 'array',
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  nullable: true,
};
const schema29 = {
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
const schema30 = {
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
const schema17 = {
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
const schema18 = {
  type: 'string',
  default: '',
  nullable: true,
};
function validate42(
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
  validate42.errors = vErrors;
  return errors === 0;
}
function validate40(
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
        !validate24(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
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
        !validate42(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate39(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
  }
  validate40.errors = vErrors;
  return errors === 0;
}
const schema31 = {
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
function validate80(
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
        !validate21(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.fieldPath !== undefined) {
      if (
        !validate24(data.fieldPath, {
          instancePath: instancePath + '/fieldPath',
          parentData: data,
          parentDataProperty: 'fieldPath',
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
  validate80.errors = vErrors;
  return errors === 0;
}
const schema32 = {
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
function validate84(
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
        !validate21(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
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
    if (data.divisor !== undefined) {
      if (
        !validate30(data.divisor, {
          instancePath: instancePath + '/divisor',
          parentData: data,
          parentDataProperty: 'divisor',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate30.errors
            : vErrors.concat(validate30.errors);
        errors = vErrors.length;
      }
    }
    if (data.resource !== undefined) {
      if (
        !validate24(data.resource, {
          instancePath: instancePath + '/resource',
          parentData: data,
          parentDataProperty: 'resource',
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
  validate84.errors = vErrors;
  return errors === 0;
}
function validate78(
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
        !validate40(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
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
    if (data.fieldRef !== undefined) {
      if (
        !validate80(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate80.errors
            : vErrors.concat(validate80.errors);
        errors = vErrors.length;
      }
    }
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate84(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate84.errors
            : vErrors.concat(validate84.errors);
        errors = vErrors.length;
      }
    }
    if (data.secretKeyRef !== undefined) {
      if (
        !validate40(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
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
  }
  validate78.errors = vErrors;
  return errors === 0;
}
function validate75(
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
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.value !== undefined) {
      if (
        !validate21(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
    if (data.valueFrom !== undefined) {
      if (
        !validate78(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate78.errors
            : vErrors.concat(validate78.errors);
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
  validate75.errors = vErrors;
  return errors === 0;
}
function validate74(
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
        !validate75(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate74.errors = vErrors;
  return errors === 0;
}
const schema33 = {
  type: 'array',
  items: {
    $ref: 'IX3OlwxoKRMSjhCltCPJOVjPaBEO4EyMsvYuOuXjxQg',
  },
  nullable: true,
};
const schema34 = {
  type: 'object',
  required: ['ip'],
  properties: {
    hostnames: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    ip: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate94(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.ip === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'ip',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.hostnames !== undefined) {
      if (
        !validate37(data.hostnames, {
          instancePath: instancePath + '/hostnames',
          parentData: data,
          parentDataProperty: 'hostnames',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
        errors = vErrors.length;
      }
    }
    if (data.ip !== undefined) {
      if (
        !validate24(data.ip, {
          instancePath: instancePath + '/ip',
          parentData: data,
          parentDataProperty: 'ip',
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
  validate94.errors = vErrors;
  return errors === 0;
}
function validate93(
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
        !validate94(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate94.errors
            : vErrors.concat(validate94.errors);
        errors = vErrors.length;
      }
    }
  }
  validate93.errors = vErrors;
  return errors === 0;
}
const schema35 = {
  type: 'array',
  items: {
    $ref: 'lX4IaYIZZv1DIKZ67DpEDlNr31ePF1qx2EUDHqZRM4',
  },
  nullable: true,
};
const schema36 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
};
function validate101(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate42(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate101.errors = vErrors;
  return errors === 0;
}
function validate100(
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
        !validate101(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate101.errors
            : vErrors.concat(validate101.errors);
        errors = vErrors.length;
      }
    }
  }
  validate100.errors = vErrors;
  return errors === 0;
}
const schema37 = {
  type: 'array',
  items: {
    $ref: 'Me3dAzCevo9JgluOcBf4PX5XcjXOHICBlAsWQglc',
  },
  nullable: true,
};
const schema38 = {
  type: 'object',
  properties: {
    effect: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    key: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    operator: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    tolerationSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    value: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
const schema39 = {
  type: 'integer',
  format: 'int64',
  nullable: true,
};
const formats0 = formats.int64;
function validate115(
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
  validate115.errors = vErrors;
  return errors === 0;
}
function validate111(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.effect !== undefined) {
      if (
        !validate21(data.effect, {
          instancePath: instancePath + '/effect',
          parentData: data,
          parentDataProperty: 'effect',
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
    if (data.key !== undefined) {
      if (
        !validate21(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
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
    if (data.operator !== undefined) {
      if (
        !validate21(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
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
    if (data.tolerationSeconds !== undefined) {
      if (
        !validate115(data.tolerationSeconds, {
          instancePath: instancePath + '/tolerationSeconds',
          parentData: data,
          parentDataProperty: 'tolerationSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate115.errors
            : vErrors.concat(validate115.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== undefined) {
      if (
        !validate21(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate111.errors = vErrors;
  return errors === 0;
}
function validate110(
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
        !validate111(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate111.errors
            : vErrors.concat(validate111.errors);
        errors = vErrors.length;
      }
    }
  }
  validate110.errors = vErrors;
  return errors === 0;
}
const schema40 = {
  type: 'array',
  items: {
    $ref: 'PMEoIw3F1IPZaI9o7ckqeodb7BJ6q7Y2F6PDUm9sk',
  },
  nullable: true,
};
const schema41 = {
  type: 'object',
  required: ['maxSkew', 'topologyKey', 'whenUnsatisfiable'],
  properties: {
    labelSelector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    matchLabelKeys: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    maxSkew: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    minDomains: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    nodeAffinityPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    nodeTaintsPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    topologyKey: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    whenUnsatisfiable: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
const schema42 = {
  type: 'object',
  properties: {
    matchExpressions: {
      $ref: '9BW0WuIp1SxhBT4vHohXPUikn0YuwzPq2mNUBC1NsE',
    },
    matchLabels: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
  },
  nullable: true,
};
const schema43 = {
  type: 'array',
  items: {
    $ref: 'MkwwSDeYoT1APit7w8qsvbKCw8OynjINdeojyPgpPQ',
  },
  nullable: true,
};
const schema44 = {
  type: 'object',
  required: ['key', 'operator'],
  properties: {
    key: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    operator: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    values: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
};
function validate124(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.key === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'key',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.operator === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'operator',
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
        !validate24(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
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
    if (data.operator !== undefined) {
      if (
        !validate24(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
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
    if (data.values !== undefined) {
      if (
        !validate37(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
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
  validate124.errors = vErrors;
  return errors === 0;
}
function validate123(
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
        !validate124(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate124.errors
            : vErrors.concat(validate124.errors);
        errors = vErrors.length;
      }
    }
  }
  validate123.errors = vErrors;
  return errors === 0;
}
function validate122(
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
    if (data.matchExpressions !== undefined) {
      if (
        !validate123(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate123.errors
            : vErrors.concat(validate123.errors);
        errors = vErrors.length;
      }
    }
    if (data.matchLabels !== undefined) {
      if (
        !validate35(data.matchLabels, {
          instancePath: instancePath + '/matchLabels',
          parentData: data,
          parentDataProperty: 'matchLabels',
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
  }
  validate122.errors = vErrors;
  return errors === 0;
}
const schema45 = {
  type: 'integer',
  format: 'int32',
};
const formats2 = formats.int32;
function validate133(
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
  if (typeof data == 'number' && isFinite(data)) {
    if (!formats2.validate(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'int32',
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
  validate133.errors = vErrors;
  return errors === 0;
}
const schema46 = {
  type: 'integer',
  format: 'int32',
  nullable: true,
};
function validate135(
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
    if (!formats2.validate(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'int32',
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
  validate135.errors = vErrors;
  return errors === 0;
}
function validate121(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.maxSkew === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'maxSkew',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.topologyKey === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'topologyKey',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.whenUnsatisfiable === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'whenUnsatisfiable',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.labelSelector !== undefined) {
      if (
        !validate122(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate122.errors
            : vErrors.concat(validate122.errors);
        errors = vErrors.length;
      }
    }
    if (data.matchLabelKeys !== undefined) {
      if (
        !validate37(data.matchLabelKeys, {
          instancePath: instancePath + '/matchLabelKeys',
          parentData: data,
          parentDataProperty: 'matchLabelKeys',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
        errors = vErrors.length;
      }
    }
    if (data.maxSkew !== undefined) {
      if (
        !validate133(data.maxSkew, {
          instancePath: instancePath + '/maxSkew',
          parentData: data,
          parentDataProperty: 'maxSkew',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate133.errors
            : vErrors.concat(validate133.errors);
        errors = vErrors.length;
      }
    }
    if (data.minDomains !== undefined) {
      if (
        !validate135(data.minDomains, {
          instancePath: instancePath + '/minDomains',
          parentData: data,
          parentDataProperty: 'minDomains',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodeAffinityPolicy !== undefined) {
      if (
        !validate21(data.nodeAffinityPolicy, {
          instancePath: instancePath + '/nodeAffinityPolicy',
          parentData: data,
          parentDataProperty: 'nodeAffinityPolicy',
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
    if (data.nodeTaintsPolicy !== undefined) {
      if (
        !validate21(data.nodeTaintsPolicy, {
          instancePath: instancePath + '/nodeTaintsPolicy',
          parentData: data,
          parentDataProperty: 'nodeTaintsPolicy',
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
    if (data.topologyKey !== undefined) {
      if (
        !validate24(data.topologyKey, {
          instancePath: instancePath + '/topologyKey',
          parentData: data,
          parentDataProperty: 'topologyKey',
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
    if (data.whenUnsatisfiable !== undefined) {
      if (
        !validate24(data.whenUnsatisfiable, {
          instancePath: instancePath + '/whenUnsatisfiable',
          parentData: data,
          parentDataProperty: 'whenUnsatisfiable',
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
    const err3 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
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
function validate59(
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
    if (data.affinity !== undefined) {
      if (
        !validate26(data.affinity, {
          instancePath: instancePath + '/affinity',
          parentData: data,
          parentDataProperty: 'affinity',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.automountServiceAccountToken !== undefined) {
      if (
        !validate39(data.automountServiceAccountToken, {
          instancePath: instancePath + '/automountServiceAccountToken',
          parentData: data,
          parentDataProperty: 'automountServiceAccountToken',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.dnsConfig !== undefined) {
      if (
        !validate62(data.dnsConfig, {
          instancePath: instancePath + '/dnsConfig',
          parentData: data,
          parentDataProperty: 'dnsConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate62.errors
            : vErrors.concat(validate62.errors);
        errors = vErrors.length;
      }
    }
    if (data.dnsPolicy !== undefined) {
      if (
        !validate21(data.dnsPolicy, {
          instancePath: instancePath + '/dnsPolicy',
          parentData: data,
          parentDataProperty: 'dnsPolicy',
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
    if (data.enableServiceLinks !== undefined) {
      if (
        !validate39(data.enableServiceLinks, {
          instancePath: instancePath + '/enableServiceLinks',
          parentData: data,
          parentDataProperty: 'enableServiceLinks',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.env !== undefined) {
      if (
        !validate74(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate74.errors
            : vErrors.concat(validate74.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostAliases !== undefined) {
      if (
        !validate93(data.hostAliases, {
          instancePath: instancePath + '/hostAliases',
          parentData: data,
          parentDataProperty: 'hostAliases',
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
    if (data.hostNetwork !== undefined) {
      if (
        !validate39(data.hostNetwork, {
          instancePath: instancePath + '/hostNetwork',
          parentData: data,
          parentDataProperty: 'hostNetwork',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.imagePullSecrets !== undefined) {
      if (
        !validate100(data.imagePullSecrets, {
          instancePath: instancePath + '/imagePullSecrets',
          parentData: data,
          parentDataProperty: 'imagePullSecrets',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate100.errors
            : vErrors.concat(validate100.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodeSelector !== undefined) {
      if (
        !validate35(data.nodeSelector, {
          instancePath: instancePath + '/nodeSelector',
          parentData: data,
          parentDataProperty: 'nodeSelector',
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
    if (data.priorityClassName !== undefined) {
      if (
        !validate21(data.priorityClassName, {
          instancePath: instancePath + '/priorityClassName',
          parentData: data,
          parentDataProperty: 'priorityClassName',
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
    if (data.runtimeClassName !== undefined) {
      if (
        !validate21(data.runtimeClassName, {
          instancePath: instancePath + '/runtimeClassName',
          parentData: data,
          parentDataProperty: 'runtimeClassName',
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
    if (data.schedulerName !== undefined) {
      if (
        !validate21(data.schedulerName, {
          instancePath: instancePath + '/schedulerName',
          parentData: data,
          parentDataProperty: 'schedulerName',
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
    if (data.securityContext !== undefined) {
      if (
        !validate26(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.tolerations !== undefined) {
      if (
        !validate110(data.tolerations, {
          instancePath: instancePath + '/tolerations',
          parentData: data,
          parentDataProperty: 'tolerations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate110.errors
            : vErrors.concat(validate110.errors);
        errors = vErrors.length;
      }
    }
    if (data.topologySpreadConstraints !== undefined) {
      if (
        !validate120(data.topologySpreadConstraints, {
          instancePath: instancePath + '/topologySpreadConstraints',
          parentData: data,
          parentDataProperty: 'topologySpreadConstraints',
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
    if (data.volumes !== undefined) {
      if (
        !validate26(data.volumes, {
          instancePath: instancePath + '/volumes',
          parentData: data,
          parentDataProperty: 'volumes',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
  }
  validate59.errors = vErrors;
  return errors === 0;
}
const schema21 = {
  type: 'array',
  items: {
    $ref: 'p2cKjcB6Zc76erfDnpdOYL6kJh1Cp5rwrbb30a6ag',
  },
  nullable: true,
};
const schema22 = {
  type: 'object',
  required: ['computeResources', 'name'],
  properties: {
    computeResources: {
      $ref: 'j1YjqCeocXqlKk4JIGLnhEGmmJ6c7jgfb8B4SmaCgNc',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
const schema23 = {
  type: 'object',
  properties: {
    claims: {
      $ref: 'miM86gTkTxUb3LLkj78AdgRYOzxzjhY2Abx8TjXGY',
    },
    limits: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
    requests: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
  },
};
function validate52(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.claims !== undefined) {
      if (
        !validate45(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate29(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate29(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate52.errors = vErrors;
  return errors === 0;
}
function validate51(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.computeResources === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'computeResources',
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
    if (data.computeResources !== undefined) {
      if (
        !validate52(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.name !== undefined) {
      if (
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate51.errors = vErrors;
  return errors === 0;
}
function validate50(
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
        !validate51(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate50.errors = vErrors;
  return errors === 0;
}
function validate182(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.computeResources !== undefined) {
      if (
        !validate183(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate183.errors
            : vErrors.concat(validate183.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate188(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate188.errors
            : vErrors.concat(validate188.errors);
        errors = vErrors.length;
      }
    }
    if (data.pipelineTaskName !== undefined) {
      if (
        !validate21(data.pipelineTaskName, {
          instancePath: instancePath + '/pipelineTaskName',
          parentData: data,
          parentDataProperty: 'pipelineTaskName',
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
    if (data.podTemplate !== undefined) {
      if (
        !validate59(data.podTemplate, {
          instancePath: instancePath + '/podTemplate',
          parentData: data,
          parentDataProperty: 'podTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate59.errors
            : vErrors.concat(validate59.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountName !== undefined) {
      if (
        !validate21(data.serviceAccountName, {
          instancePath: instancePath + '/serviceAccountName',
          parentData: data,
          parentDataProperty: 'serviceAccountName',
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
    if (data.sidecarSpecs !== undefined) {
      if (
        !validate50(data.sidecarSpecs, {
          instancePath: instancePath + '/sidecarSpecs',
          parentData: data,
          parentDataProperty: 'sidecarSpecs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate50.errors
            : vErrors.concat(validate50.errors);
        errors = vErrors.length;
      }
    }
    if (data.stepSpecs !== undefined) {
      if (
        !validate50(data.stepSpecs, {
          instancePath: instancePath + '/stepSpecs',
          parentData: data,
          parentDataProperty: 'stepSpecs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate50.errors
            : vErrors.concat(validate50.errors);
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
  validate182.errors = vErrors;
  return errors === 0;
}
function validate181(
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
        !validate182(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate182.errors
            : vErrors.concat(validate182.errors);
        errors = vErrors.length;
      }
    }
  }
  validate181.errors = vErrors;
  return errors === 0;
}
const schema64 = {
  type: 'object',
  properties: {
    podTemplate: {
      $ref: '8VQBVoto93rwyDOqc4Ic3zpvE15YraSiR1tTv6eVfw',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate199(
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
    if (data.podTemplate !== undefined) {
      if (
        !validate59(data.podTemplate, {
          instancePath: instancePath + '/podTemplate',
          parentData: data,
          parentDataProperty: 'podTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate59.errors
            : vErrors.concat(validate59.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountName !== undefined) {
      if (
        !validate21(data.serviceAccountName, {
          instancePath: instancePath + '/serviceAccountName',
          parentData: data,
          parentDataProperty: 'serviceAccountName',
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
  validate199.errors = vErrors;
  return errors === 0;
}
const schema65 = {
  type: 'object',
  properties: {
    finally: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    pipeline: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    tasks: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate203(
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
    if (data.finally !== undefined) {
      if (
        !validate21(data.finally, {
          instancePath: instancePath + '/finally',
          parentData: data,
          parentDataProperty: 'finally',
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
    if (data.pipeline !== undefined) {
      if (
        !validate21(data.pipeline, {
          instancePath: instancePath + '/pipeline',
          parentData: data,
          parentDataProperty: 'pipeline',
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
    if (data.tasks !== undefined) {
      if (
        !validate21(data.tasks, {
          instancePath: instancePath + '/tasks',
          parentData: data,
          parentDataProperty: 'tasks',
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
  validate203.errors = vErrors;
  return errors === 0;
}
const schema66 = {
  type: 'array',
  items: {
    $ref: 'pbI2wQ0FVF5d8RbWov7wdwRzVG8Hm8lGG7TXQrZzUI',
  },
  nullable: true,
};
const schema67 = {
  type: 'object',
  required: ['name'],
  properties: {
    configMap: {
      $ref: '7XGmSTaS5nGo4HiXt5rfERcRI5aVsVdyyABVLyzsTI',
    },
    csi: {
      $ref: 'q2IGDntd8LFnVZFXWQ7NGhCYh1oLd4BPT8XgGqhtXI',
    },
    emptyDir: {
      $ref: 'oCPGk3BkJBAY5rCBWsfjLE97smSw378DNB3pJ2yQdAU',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    persistentVolumeClaim: {
      $ref: 'STKrnHXjnhmUK8ywI96Co95jk513Kd6B4STnaeRjE8',
    },
    projected: {
      $ref: 'hWXON8W1ItzGnjJxXJXTOe3qKa0WzvG2EEBUDUkYrc',
    },
    secret: {
      $ref: '7hoi1hZ13HUjcnY6nweLgqKxHiHpOSs0cLYzJyXZdI',
    },
    subPath: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeClaimTemplate: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
};
const schema68 = {
  type: 'object',
  properties: {
    defaultMode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    items: {
      $ref: 'bOfN3l1QF0mww6to6sM7AuvRsOk8kXQng6eAelVIQlw',
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
const schema47 = {
  type: 'array',
  items: {
    $ref: 'KZm4JRWtb68G65niEVa35cCfAyEYRWGkoaumd8EY',
  },
  nullable: true,
};
const schema48 = {
  type: 'object',
  required: ['key', 'path'],
  properties: {
    key: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    mode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate145(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.key === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'key',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.path === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'path',
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
        !validate24(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
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
    if (data.mode !== undefined) {
      if (
        !validate135(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.path !== undefined) {
      if (
        !validate24(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
  validate145.errors = vErrors;
  return errors === 0;
}
function validate144(
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
        !validate145(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate145.errors
            : vErrors.concat(validate145.errors);
        errors = vErrors.length;
      }
    }
  }
  validate144.errors = vErrors;
  return errors === 0;
}
function validate210(
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
    if (data.defaultMode !== undefined) {
      if (
        !validate135(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.items !== undefined) {
      if (
        !validate144(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate144.errors
            : vErrors.concat(validate144.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate42(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate39(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
  }
  validate210.errors = vErrors;
  return errors === 0;
}
const schema69 = {
  type: 'object',
  required: ['driver'],
  properties: {
    driver: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    nodePublishSecretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    volumeAttributes: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
  },
  nullable: true,
};
const schema70 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  nullable: true,
};
function validate219(
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
    if (data.name !== undefined) {
      if (
        !validate42(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  }
  validate219.errors = vErrors;
  return errors === 0;
}
function validate216(
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
    if (data.driver === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'driver',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.driver !== undefined) {
      if (
        !validate24(data.driver, {
          instancePath: instancePath + '/driver',
          parentData: data,
          parentDataProperty: 'driver',
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
    if (data.fsType !== undefined) {
      if (
        !validate21(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.nodePublishSecretRef !== undefined) {
      if (
        !validate219(data.nodePublishSecretRef, {
          instancePath: instancePath + '/nodePublishSecretRef',
          parentData: data,
          parentDataProperty: 'nodePublishSecretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate219.errors
            : vErrors.concat(validate219.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnly !== undefined) {
      if (
        !validate39(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeAttributes !== undefined) {
      if (
        !validate35(data.volumeAttributes, {
          instancePath: instancePath + '/volumeAttributes',
          parentData: data,
          parentDataProperty: 'volumeAttributes',
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
  }
  validate216.errors = vErrors;
  return errors === 0;
}
const schema71 = {
  type: 'object',
  properties: {
    medium: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sizeLimit: {
      $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
    },
  },
  nullable: true,
};
function validate225(
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
    if (data.medium !== undefined) {
      if (
        !validate21(data.medium, {
          instancePath: instancePath + '/medium',
          parentData: data,
          parentDataProperty: 'medium',
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
    if (data.sizeLimit !== undefined) {
      if (
        !validate30(data.sizeLimit, {
          instancePath: instancePath + '/sizeLimit',
          parentData: data,
          parentDataProperty: 'sizeLimit',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate30.errors
            : vErrors.concat(validate30.errors);
        errors = vErrors.length;
      }
    }
  }
  validate225.errors = vErrors;
  return errors === 0;
}
const schema72 = {
  type: 'object',
  required: ['claimName'],
  properties: {
    claimName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  nullable: true,
};
function validate230(
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
    if (data.claimName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'claimName',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.claimName !== undefined) {
      if (
        !validate24(data.claimName, {
          instancePath: instancePath + '/claimName',
          parentData: data,
          parentDataProperty: 'claimName',
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
    if (data.readOnly !== undefined) {
      if (
        !validate39(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
  }
  validate230.errors = vErrors;
  return errors === 0;
}
const schema73 = {
  type: 'object',
  properties: {
    defaultMode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    sources: {
      $ref: 'mp8JRMbiEOTZhAAcfihFgSA7DAOtNWkRHgcGCNLAA',
    },
  },
  nullable: true,
};
const schema74 = {
  type: 'array',
  items: {
    $ref: 'WICQ5kdq9kT3ygPK1xgAXHZR3qlzTXRJaybZiIbakk',
  },
  nullable: true,
};
const schema75 = {
  type: 'object',
  properties: {
    clusterTrustBundle: {
      $ref: 'ixT8Q9NkDjrHRzk0hbKjZoTqxW8SVHnDUv4FKaevD8',
    },
    configMap: {
      $ref: 'qXrowbPU13AzCSlUTG7pOcJYIkAZwvvF0O8H7dy7P8',
    },
    downwardAPI: {
      $ref: 'jT5EAzotOiaS75BFqVTEtfS83Rl5cvFYVcMxbvOETU',
    },
    secret: {
      $ref: 'qXrowbPU13AzCSlUTG7pOcJYIkAZwvvF0O8H7dy7P8',
    },
    serviceAccountToken: {
      $ref: '0BsTGqumYwSj0foZkstB2wsVBt1d0Yb7yN2zIsVfc',
    },
  },
};
const schema76 = {
  type: 'object',
  required: ['path'],
  properties: {
    labelSelector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    signerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate238(
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
    if (data.path === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'path',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.labelSelector !== undefined) {
      if (
        !validate122(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate122.errors
            : vErrors.concat(validate122.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate21(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate39(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.path !== undefined) {
      if (
        !validate24(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.signerName !== undefined) {
      if (
        !validate21(data.signerName, {
          instancePath: instancePath + '/signerName',
          parentData: data,
          parentDataProperty: 'signerName',
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
  validate238.errors = vErrors;
  return errors === 0;
}
const schema49 = {
  type: 'object',
  properties: {
    items: {
      $ref: 'bOfN3l1QF0mww6to6sM7AuvRsOk8kXQng6eAelVIQlw',
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
function validate150(
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
    if (data.items !== undefined) {
      if (
        !validate144(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate144.errors
            : vErrors.concat(validate144.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate42(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate39(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
  }
  validate150.errors = vErrors;
  return errors === 0;
}
const schema77 = {
  type: 'object',
  properties: {
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  nullable: true,
};
const schema78 = {
  type: 'array',
  items: {
    $ref: '83t6EKcTjvzxVMR8ob3sMZu0lIqxm1azYctskfY5Ks4',
  },
  nullable: true,
};
const schema79 = {
  type: 'object',
  required: ['path'],
  properties: {
    fieldRef: {
      $ref: 'B5jNtau7CpFJjYJrsYhyzxmI9XsIag7F9u7xksrgmQk',
    },
    mode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resourceFieldRef: {
      $ref: 'D7PNj4ec9vScD68sAz7HLGzoBiyO7djP09KZXUzl2Y4',
    },
  },
};
function validate248(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.path === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'path',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.fieldRef !== undefined) {
      if (
        !validate80(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate80.errors
            : vErrors.concat(validate80.errors);
        errors = vErrors.length;
      }
    }
    if (data.mode !== undefined) {
      if (
        !validate135(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.path !== undefined) {
      if (
        !validate24(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate84(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate84.errors
            : vErrors.concat(validate84.errors);
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
  validate248.errors = vErrors;
  return errors === 0;
}
function validate247(
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
        !validate248(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate248.errors
            : vErrors.concat(validate248.errors);
        errors = vErrors.length;
      }
    }
  }
  validate247.errors = vErrors;
  return errors === 0;
}
function validate246(
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
    if (data.items !== undefined) {
      if (
        !validate247(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate247.errors
            : vErrors.concat(validate247.errors);
        errors = vErrors.length;
      }
    }
  }
  validate246.errors = vErrors;
  return errors === 0;
}
const schema80 = {
  type: 'object',
  required: ['path'],
  properties: {
    audience: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    expirationSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  nullable: true,
};
function validate257(
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
    if (data.path === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'path',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.audience !== undefined) {
      if (
        !validate21(data.audience, {
          instancePath: instancePath + '/audience',
          parentData: data,
          parentDataProperty: 'audience',
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
    if (data.expirationSeconds !== undefined) {
      if (
        !validate115(data.expirationSeconds, {
          instancePath: instancePath + '/expirationSeconds',
          parentData: data,
          parentDataProperty: 'expirationSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate115.errors
            : vErrors.concat(validate115.errors);
        errors = vErrors.length;
      }
    }
    if (data.path !== undefined) {
      if (
        !validate24(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
  validate257.errors = vErrors;
  return errors === 0;
}
function validate237(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.clusterTrustBundle !== undefined) {
      if (
        !validate238(data.clusterTrustBundle, {
          instancePath: instancePath + '/clusterTrustBundle',
          parentData: data,
          parentDataProperty: 'clusterTrustBundle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate238.errors
            : vErrors.concat(validate238.errors);
        errors = vErrors.length;
      }
    }
    if (data.configMap !== undefined) {
      if (
        !validate150(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate150.errors
            : vErrors.concat(validate150.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate246(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate246.errors
            : vErrors.concat(validate246.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate150(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate150.errors
            : vErrors.concat(validate150.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountToken !== undefined) {
      if (
        !validate257(data.serviceAccountToken, {
          instancePath: instancePath + '/serviceAccountToken',
          parentData: data,
          parentDataProperty: 'serviceAccountToken',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate257.errors
            : vErrors.concat(validate257.errors);
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
  validate237.errors = vErrors;
  return errors === 0;
}
function validate236(
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
        !validate237(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate237.errors
            : vErrors.concat(validate237.errors);
        errors = vErrors.length;
      }
    }
  }
  validate236.errors = vErrors;
  return errors === 0;
}
function validate234(
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
    if (data.defaultMode !== undefined) {
      if (
        !validate135(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.sources !== undefined) {
      if (
        !validate236(data.sources, {
          instancePath: instancePath + '/sources',
          parentData: data,
          parentDataProperty: 'sources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate236.errors
            : vErrors.concat(validate236.errors);
        errors = vErrors.length;
      }
    }
  }
  validate234.errors = vErrors;
  return errors === 0;
}
const schema81 = {
  type: 'object',
  properties: {
    defaultMode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    items: {
      $ref: 'bOfN3l1QF0mww6to6sM7AuvRsOk8kXQng6eAelVIQlw',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate265(
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
    if (data.defaultMode !== undefined) {
      if (
        !validate135(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate135.errors
            : vErrors.concat(validate135.errors);
        errors = vErrors.length;
      }
    }
    if (data.items !== undefined) {
      if (
        !validate144(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate144.errors
            : vErrors.concat(validate144.errors);
        errors = vErrors.length;
      }
    }
    if (data.optional !== undefined) {
      if (
        !validate39(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.secretName !== undefined) {
      if (
        !validate21(data.secretName, {
          instancePath: instancePath + '/secretName',
          parentData: data,
          parentDataProperty: 'secretName',
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
  validate265.errors = vErrors;
  return errors === 0;
}
function validate209(
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
    if (data.configMap !== undefined) {
      if (
        !validate210(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate210.errors
            : vErrors.concat(validate210.errors);
        errors = vErrors.length;
      }
    }
    if (data.csi !== undefined) {
      if (
        !validate216(data.csi, {
          instancePath: instancePath + '/csi',
          parentData: data,
          parentDataProperty: 'csi',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate216.errors
            : vErrors.concat(validate216.errors);
        errors = vErrors.length;
      }
    }
    if (data.emptyDir !== undefined) {
      if (
        !validate225(data.emptyDir, {
          instancePath: instancePath + '/emptyDir',
          parentData: data,
          parentDataProperty: 'emptyDir',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate225.errors
            : vErrors.concat(validate225.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.persistentVolumeClaim !== undefined) {
      if (
        !validate230(data.persistentVolumeClaim, {
          instancePath: instancePath + '/persistentVolumeClaim',
          parentData: data,
          parentDataProperty: 'persistentVolumeClaim',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate230.errors
            : vErrors.concat(validate230.errors);
        errors = vErrors.length;
      }
    }
    if (data.projected !== undefined) {
      if (
        !validate234(data.projected, {
          instancePath: instancePath + '/projected',
          parentData: data,
          parentDataProperty: 'projected',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate234.errors
            : vErrors.concat(validate234.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate265(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate265.errors
            : vErrors.concat(validate265.errors);
        errors = vErrors.length;
      }
    }
    if (data.subPath !== undefined) {
      if (
        !validate21(data.subPath, {
          instancePath: instancePath + '/subPath',
          parentData: data,
          parentDataProperty: 'subPath',
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
    if (data.volumeClaimTemplate !== undefined) {
      if (
        !validate26(data.volumeClaimTemplate, {
          instancePath: instancePath + '/volumeClaimTemplate',
          parentData: data,
          parentDataProperty: 'volumeClaimTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
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
  validate209.errors = vErrors;
  return errors === 0;
}
function validate208(
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
        !validate209(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate209.errors
            : vErrors.concat(validate209.errors);
        errors = vErrors.length;
      }
    }
  }
  validate208.errors = vErrors;
  return errors === 0;
}
function validate171(
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
    if (data.params !== undefined) {
      if (
        !validate22(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
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
    if (data.pipelineRef !== undefined) {
      if (
        !validate173(data.pipelineRef, {
          instancePath: instancePath + '/pipelineRef',
          parentData: data,
          parentDataProperty: 'pipelineRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate173.errors
            : vErrors.concat(validate173.errors);
        errors = vErrors.length;
      }
    }
    if (data.pipelineSpec !== undefined) {
      if (
        !validate26(data.pipelineSpec, {
          instancePath: instancePath + '/pipelineSpec',
          parentData: data,
          parentDataProperty: 'pipelineSpec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (
        !validate21(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
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
    if (data.taskRunSpecs !== undefined) {
      if (
        !validate181(data.taskRunSpecs, {
          instancePath: instancePath + '/taskRunSpecs',
          parentData: data,
          parentDataProperty: 'taskRunSpecs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate181.errors
            : vErrors.concat(validate181.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskRunTemplate !== undefined) {
      if (
        !validate199(data.taskRunTemplate, {
          instancePath: instancePath + '/taskRunTemplate',
          parentData: data,
          parentDataProperty: 'taskRunTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate199.errors
            : vErrors.concat(validate199.errors);
        errors = vErrors.length;
      }
    }
    if (data.timeouts !== undefined) {
      if (
        !validate203(data.timeouts, {
          instancePath: instancePath + '/timeouts',
          parentData: data,
          parentDataProperty: 'timeouts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate203.errors
            : vErrors.concat(validate203.errors);
        errors = vErrors.length;
      }
    }
    if (data.workspaces !== undefined) {
      if (
        !validate208(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate208.errors
            : vErrors.concat(validate208.errors);
        errors = vErrors.length;
      }
    }
  }
  validate171.errors = vErrors;
  return errors === 0;
}
const schema82 = {
  type: 'object',
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    childReferences: {
      $ref: 'eCk0hCIgXVuOfW80s5a0eKV4oI8STAjacFui5c6RMM',
    },
    completionTime: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
    conditions: {
      $ref: 'pDZ5TS4rKMc9yWpKfve3PLPuyE0AyffnVF24ZS7o7w',
    },
    finallyStartTime: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
    observedGeneration: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    pipelineSpec: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    provenance: {
      $ref: '69mOpxlt0aD4vMopIeK0zOQ2HQ1bNRej6amKUwmAwsY',
    },
    results: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    skippedTasks: {
      $ref: '47KIL8gFNyIchSnaQXNEiiF04PqG7XFLCPIfW67g7tk',
    },
    spanContext: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    startTime: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
  },
  nullable: true,
};
const schema83 = {
  type: 'array',
  items: {
    $ref: 'k8JkWs2nY7uS02yc94eRIOTiH8Q2aArKB4ZLXF5DgU',
  },
  nullable: true,
};
const schema84 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    displayName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    kind: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    pipelineTaskName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    whenExpressions: {
      $ref: 'K2jFzIlzvsHrdJrlU7ViVjY6dhLP4wG3VXFMAwf9U',
    },
  },
};
const schema51 = {
  type: 'array',
  items: {
    $ref: '3gytCkvMwLExpL6MGpbNjXP74frkSgUMMmU0dalCk',
  },
  nullable: true,
};
const schema52 = {
  type: 'object',
  properties: {
    cel: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    input: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    operator: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    values: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
};
function validate156(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.cel !== undefined) {
      if (
        !validate21(data.cel, {
          instancePath: instancePath + '/cel',
          parentData: data,
          parentDataProperty: 'cel',
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
    if (data.input !== undefined) {
      if (
        !validate21(data.input, {
          instancePath: instancePath + '/input',
          parentData: data,
          parentDataProperty: 'input',
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
    if (data.operator !== undefined) {
      if (
        !validate21(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
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
    if (data.values !== undefined) {
      if (
        !validate37(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate37.errors
            : vErrors.concat(validate37.errors);
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
  validate156.errors = vErrors;
  return errors === 0;
}
function validate155(
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
        !validate156(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate156.errors
            : vErrors.concat(validate156.errors);
        errors = vErrors.length;
      }
    }
  }
  validate155.errors = vErrors;
  return errors === 0;
}
function validate279(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.apiVersion !== undefined) {
      if (
        !validate21(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.displayName !== undefined) {
      if (
        !validate21(data.displayName, {
          instancePath: instancePath + '/displayName',
          parentData: data,
          parentDataProperty: 'displayName',
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
    if (data.kind !== undefined) {
      if (
        !validate21(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
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
        !validate21(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.pipelineTaskName !== undefined) {
      if (
        !validate21(data.pipelineTaskName, {
          instancePath: instancePath + '/pipelineTaskName',
          parentData: data,
          parentDataProperty: 'pipelineTaskName',
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
    if (data.whenExpressions !== undefined) {
      if (
        !validate155(data.whenExpressions, {
          instancePath: instancePath + '/whenExpressions',
          parentData: data,
          parentDataProperty: 'whenExpressions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate155.errors
            : vErrors.concat(validate155.errors);
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
  validate279.errors = vErrors;
  return errors === 0;
}
function validate278(
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
        !validate279(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate279.errors
            : vErrors.concat(validate279.errors);
        errors = vErrors.length;
      }
    }
  }
  validate278.errors = vErrors;
  return errors === 0;
}
const schema50 = {
  type: 'string',
  format: 'date-time',
  nullable: true,
};
const formats6 = formats['date-time'];
function validate154(
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
  if (typeof data === 'string') {
    if (!formats6.validate(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'date-time',
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
  validate154.errors = vErrors;
  return errors === 0;
}
const schema85 = {
  type: 'array',
  items: {
    $ref: 'wbr2E4NheEu4hYPlq9gH96fDqOeJ0hkPnqS5qesgw',
  },
  nullable: true,
};
const schema86 = {
  type: 'object',
  required: ['status', 'type'],
  properties: {
    lastTransitionTime: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    message: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    reason: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    severity: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    status: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate290(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.status === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'status',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
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
    if (data.lastTransitionTime !== undefined) {
      if (
        !validate21(data.lastTransitionTime, {
          instancePath: instancePath + '/lastTransitionTime',
          parentData: data,
          parentDataProperty: 'lastTransitionTime',
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
    if (data.message !== undefined) {
      if (
        !validate21(data.message, {
          instancePath: instancePath + '/message',
          parentData: data,
          parentDataProperty: 'message',
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
    if (data.reason !== undefined) {
      if (
        !validate21(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
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
    if (data.severity !== undefined) {
      if (
        !validate21(data.severity, {
          instancePath: instancePath + '/severity',
          parentData: data,
          parentDataProperty: 'severity',
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
    if (data.status !== undefined) {
      if (
        !validate24(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
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
  validate290.errors = vErrors;
  return errors === 0;
}
function validate289(
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
        !validate290(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate290.errors
            : vErrors.concat(validate290.errors);
        errors = vErrors.length;
      }
    }
  }
  validate289.errors = vErrors;
  return errors === 0;
}
const schema87 = {
  type: 'object',
  properties: {
    featureFlags: {
      $ref: 'MeroYSoY3eGOZhWxlxL9tiztfQqGautXt9z29A4kQkQ',
    },
    refSource: {
      $ref: 'yBOuEehMG3lG3Dk0iLRM7CQ86QHVvUeGzVboVFKUAg',
    },
  },
  nullable: true,
};
const schema88 = {
  type: 'object',
  properties: {
    awaitSidecarReadiness: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    coschedule: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    disableCredsInit: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    disableInlineSpec: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    enableAPIFields: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    enableArtifacts: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableCELInWhenExpression: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableConciseResolverSyntax: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableKeepPodOnCancel: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableKubernetesSidecar: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableParamEnum: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableProvenanceInStatus: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enableStepActions: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    enforceNonfalsifiability: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    maxResultSize: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    requireGitSSHSecretKnownHosts: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    resultExtractionMethod: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    runningInEnvWithInjectedSidecars: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    sendCloudEventsForRuns: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    setSecurityContext: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    setSecurityContextReadOnlyRootFilesystem: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    verificationNoMatchPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
const schema89 = {
  type: 'integer',
  nullable: true,
};
function validate318(
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
  validate318.errors = vErrors;
  return errors === 0;
}
function validate303(
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
    if (data.awaitSidecarReadiness !== undefined) {
      if (
        !validate39(data.awaitSidecarReadiness, {
          instancePath: instancePath + '/awaitSidecarReadiness',
          parentData: data,
          parentDataProperty: 'awaitSidecarReadiness',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.coschedule !== undefined) {
      if (
        !validate21(data.coschedule, {
          instancePath: instancePath + '/coschedule',
          parentData: data,
          parentDataProperty: 'coschedule',
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
    if (data.disableCredsInit !== undefined) {
      if (
        !validate39(data.disableCredsInit, {
          instancePath: instancePath + '/disableCredsInit',
          parentData: data,
          parentDataProperty: 'disableCredsInit',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.disableInlineSpec !== undefined) {
      if (
        !validate21(data.disableInlineSpec, {
          instancePath: instancePath + '/disableInlineSpec',
          parentData: data,
          parentDataProperty: 'disableInlineSpec',
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
    if (data.enableAPIFields !== undefined) {
      if (
        !validate21(data.enableAPIFields, {
          instancePath: instancePath + '/enableAPIFields',
          parentData: data,
          parentDataProperty: 'enableAPIFields',
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
    if (data.enableArtifacts !== undefined) {
      if (
        !validate39(data.enableArtifacts, {
          instancePath: instancePath + '/enableArtifacts',
          parentData: data,
          parentDataProperty: 'enableArtifacts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableCELInWhenExpression !== undefined) {
      if (
        !validate39(data.enableCELInWhenExpression, {
          instancePath: instancePath + '/enableCELInWhenExpression',
          parentData: data,
          parentDataProperty: 'enableCELInWhenExpression',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableConciseResolverSyntax !== undefined) {
      if (
        !validate39(data.enableConciseResolverSyntax, {
          instancePath: instancePath + '/enableConciseResolverSyntax',
          parentData: data,
          parentDataProperty: 'enableConciseResolverSyntax',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableKeepPodOnCancel !== undefined) {
      if (
        !validate39(data.enableKeepPodOnCancel, {
          instancePath: instancePath + '/enableKeepPodOnCancel',
          parentData: data,
          parentDataProperty: 'enableKeepPodOnCancel',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableKubernetesSidecar !== undefined) {
      if (
        !validate39(data.enableKubernetesSidecar, {
          instancePath: instancePath + '/enableKubernetesSidecar',
          parentData: data,
          parentDataProperty: 'enableKubernetesSidecar',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableParamEnum !== undefined) {
      if (
        !validate39(data.enableParamEnum, {
          instancePath: instancePath + '/enableParamEnum',
          parentData: data,
          parentDataProperty: 'enableParamEnum',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableProvenanceInStatus !== undefined) {
      if (
        !validate39(data.enableProvenanceInStatus, {
          instancePath: instancePath + '/enableProvenanceInStatus',
          parentData: data,
          parentDataProperty: 'enableProvenanceInStatus',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableStepActions !== undefined) {
      if (
        !validate39(data.enableStepActions, {
          instancePath: instancePath + '/enableStepActions',
          parentData: data,
          parentDataProperty: 'enableStepActions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.enforceNonfalsifiability !== undefined) {
      if (
        !validate21(data.enforceNonfalsifiability, {
          instancePath: instancePath + '/enforceNonfalsifiability',
          parentData: data,
          parentDataProperty: 'enforceNonfalsifiability',
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
    if (data.maxResultSize !== undefined) {
      if (
        !validate318(data.maxResultSize, {
          instancePath: instancePath + '/maxResultSize',
          parentData: data,
          parentDataProperty: 'maxResultSize',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate318.errors
            : vErrors.concat(validate318.errors);
        errors = vErrors.length;
      }
    }
    if (data.requireGitSSHSecretKnownHosts !== undefined) {
      if (
        !validate39(data.requireGitSSHSecretKnownHosts, {
          instancePath: instancePath + '/requireGitSSHSecretKnownHosts',
          parentData: data,
          parentDataProperty: 'requireGitSSHSecretKnownHosts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.resultExtractionMethod !== undefined) {
      if (
        !validate21(data.resultExtractionMethod, {
          instancePath: instancePath + '/resultExtractionMethod',
          parentData: data,
          parentDataProperty: 'resultExtractionMethod',
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
    if (data.runningInEnvWithInjectedSidecars !== undefined) {
      if (
        !validate39(data.runningInEnvWithInjectedSidecars, {
          instancePath: instancePath + '/runningInEnvWithInjectedSidecars',
          parentData: data,
          parentDataProperty: 'runningInEnvWithInjectedSidecars',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.sendCloudEventsForRuns !== undefined) {
      if (
        !validate39(data.sendCloudEventsForRuns, {
          instancePath: instancePath + '/sendCloudEventsForRuns',
          parentData: data,
          parentDataProperty: 'sendCloudEventsForRuns',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.setSecurityContext !== undefined) {
      if (
        !validate39(data.setSecurityContext, {
          instancePath: instancePath + '/setSecurityContext',
          parentData: data,
          parentDataProperty: 'setSecurityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.setSecurityContextReadOnlyRootFilesystem !== undefined) {
      if (
        !validate39(data.setSecurityContextReadOnlyRootFilesystem, {
          instancePath:
            instancePath + '/setSecurityContextReadOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'setSecurityContextReadOnlyRootFilesystem',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate39.errors
            : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
    if (data.verificationNoMatchPolicy !== undefined) {
      if (
        !validate21(data.verificationNoMatchPolicy, {
          instancePath: instancePath + '/verificationNoMatchPolicy',
          parentData: data,
          parentDataProperty: 'verificationNoMatchPolicy',
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
  validate303.errors = vErrors;
  return errors === 0;
}
const schema90 = {
  type: 'object',
  properties: {
    digest: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    entryPoint: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    uri: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate328(
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
    if (data.digest !== undefined) {
      if (
        !validate35(data.digest, {
          instancePath: instancePath + '/digest',
          parentData: data,
          parentDataProperty: 'digest',
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
    if (data.entryPoint !== undefined) {
      if (
        !validate21(data.entryPoint, {
          instancePath: instancePath + '/entryPoint',
          parentData: data,
          parentDataProperty: 'entryPoint',
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
    if (data.uri !== undefined) {
      if (
        !validate21(data.uri, {
          instancePath: instancePath + '/uri',
          parentData: data,
          parentDataProperty: 'uri',
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
  validate328.errors = vErrors;
  return errors === 0;
}
function validate302(
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
    if (data.featureFlags !== undefined) {
      if (
        !validate303(data.featureFlags, {
          instancePath: instancePath + '/featureFlags',
          parentData: data,
          parentDataProperty: 'featureFlags',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate303.errors
            : vErrors.concat(validate303.errors);
        errors = vErrors.length;
      }
    }
    if (data.refSource !== undefined) {
      if (
        !validate328(data.refSource, {
          instancePath: instancePath + '/refSource',
          parentData: data,
          parentDataProperty: 'refSource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate328.errors
            : vErrors.concat(validate328.errors);
        errors = vErrors.length;
      }
    }
  }
  validate302.errors = vErrors;
  return errors === 0;
}
const schema91 = {
  type: 'array',
  items: {
    $ref: 'XAnPTyhro8L2d1b3PuD1qgwyTO0Xm4U5ZZ0Rg1Isz0',
  },
  nullable: true,
};
const schema92 = {
  type: 'object',
  required: ['name', 'reason'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    reason: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    whenExpressions: {
      $ref: 'K2jFzIlzvsHrdJrlU7ViVjY6dhLP4wG3VXFMAwf9U',
    },
  },
};
function validate336(
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
    if (data.reason === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'reason',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name !== undefined) {
      if (
        !validate24(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.reason !== undefined) {
      if (
        !validate24(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
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
    if (data.whenExpressions !== undefined) {
      if (
        !validate155(data.whenExpressions, {
          instancePath: instancePath + '/whenExpressions',
          parentData: data,
          parentDataProperty: 'whenExpressions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate155.errors
            : vErrors.concat(validate155.errors);
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
  validate336.errors = vErrors;
  return errors === 0;
}
function validate335(
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
        !validate336(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate336.errors
            : vErrors.concat(validate336.errors);
        errors = vErrors.length;
      }
    }
  }
  validate335.errors = vErrors;
  return errors === 0;
}
function validate276(
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
    if (data.annotations !== undefined) {
      if (
        !validate35(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
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
    if (data.childReferences !== undefined) {
      if (
        !validate278(data.childReferences, {
          instancePath: instancePath + '/childReferences',
          parentData: data,
          parentDataProperty: 'childReferences',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate278.errors
            : vErrors.concat(validate278.errors);
        errors = vErrors.length;
      }
    }
    if (data.completionTime !== undefined) {
      if (
        !validate154(data.completionTime, {
          instancePath: instancePath + '/completionTime',
          parentData: data,
          parentDataProperty: 'completionTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate154.errors
            : vErrors.concat(validate154.errors);
        errors = vErrors.length;
      }
    }
    if (data.conditions !== undefined) {
      if (
        !validate289(data.conditions, {
          instancePath: instancePath + '/conditions',
          parentData: data,
          parentDataProperty: 'conditions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate289.errors
            : vErrors.concat(validate289.errors);
        errors = vErrors.length;
      }
    }
    if (data.finallyStartTime !== undefined) {
      if (
        !validate154(data.finallyStartTime, {
          instancePath: instancePath + '/finallyStartTime',
          parentData: data,
          parentDataProperty: 'finallyStartTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate154.errors
            : vErrors.concat(validate154.errors);
        errors = vErrors.length;
      }
    }
    if (data.observedGeneration !== undefined) {
      if (
        !validate115(data.observedGeneration, {
          instancePath: instancePath + '/observedGeneration',
          parentData: data,
          parentDataProperty: 'observedGeneration',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate115.errors
            : vErrors.concat(validate115.errors);
        errors = vErrors.length;
      }
    }
    if (data.pipelineSpec !== undefined) {
      if (
        !validate26(data.pipelineSpec, {
          instancePath: instancePath + '/pipelineSpec',
          parentData: data,
          parentDataProperty: 'pipelineSpec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate26.errors
            : vErrors.concat(validate26.errors);
        errors = vErrors.length;
      }
    }
    if (data.provenance !== undefined) {
      if (
        !validate302(data.provenance, {
          instancePath: instancePath + '/provenance',
          parentData: data,
          parentDataProperty: 'provenance',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate302.errors
            : vErrors.concat(validate302.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate22(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
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
    if (data.skippedTasks !== undefined) {
      if (
        !validate335(data.skippedTasks, {
          instancePath: instancePath + '/skippedTasks',
          parentData: data,
          parentDataProperty: 'skippedTasks',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate335.errors
            : vErrors.concat(validate335.errors);
        errors = vErrors.length;
      }
    }
    if (data.spanContext !== undefined) {
      if (
        !validate35(data.spanContext, {
          instancePath: instancePath + '/spanContext',
          parentData: data,
          parentDataProperty: 'spanContext',
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
    if (data.startTime !== undefined) {
      if (
        !validate154(data.startTime, {
          instancePath: instancePath + '/startTime',
          parentData: data,
          parentDataProperty: 'startTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate154.errors
            : vErrors.concat(validate154.errors);
        errors = vErrors.length;
      }
    }
  }
  validate276.errors = vErrors;
  return errors === 0;
}
function validate162(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1.PipelineRun" */
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
        !validate163(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate163.errors
            : vErrors.concat(validate163.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate165(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate165.errors
            : vErrors.concat(validate165.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate167(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate167.errors
            : vErrors.concat(validate167.errors);
        errors = vErrors.length;
      }
    }
    if (data.spec !== undefined) {
      if (
        !validate171(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate171.errors
            : vErrors.concat(validate171.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (
        !validate276(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate276.errors
            : vErrors.concat(validate276.errors);
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
  validate162.errors = vErrors;
  return errors === 0;
}
