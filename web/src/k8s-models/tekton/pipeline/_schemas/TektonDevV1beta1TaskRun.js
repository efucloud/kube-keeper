import { formats } from '@kubernetes-models/validate';
export const validate = validate176;
const schema57 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: '7H7QTLHWjsW4ORrCnkHX3WahQAZYEwSG5D7kdY2U',
    },
    kind: {
      $ref: 'luvmBdxKgNRJAhjCfZBRstbb2hj9XqYLp3ocvGvH0A',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'X46ZEqEu8JYW8U96yJvrlDVZdu6WRhhCi6BykxqosA',
    },
    status: {
      $ref: '8iQTGmsplfX3CdoXLJB42sXRgxYs9JHuw8vfT0xkwvo',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1beta1.TaskRun',
};
const schema58 = {
  type: 'string',
  enum: ['tekton.dev/v1beta1'],
};
function validate177(
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
        allowedValues: schema58.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate177.errors = vErrors;
  return errors === 0;
}
const schema59 = {
  type: 'string',
  enum: ['TaskRun'],
};
function validate179(
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
  if (!(data === 'TaskRun')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema59.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate179.errors = vErrors;
  return errors === 0;
}
const schema60 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema61 = {};

import { validate as validate182 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate181(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate182(data, {
        instancePath,
        parentData,
        parentDataProperty,
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
  validate181.errors = vErrors;
  return errors === 0;
}
const schema62 = {
  type: 'object',
  properties: {
    computeResources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    debug: {
      $ref: 'KNOLOkdEjttqleQigmdkiwmVrVlhUUB81kwPtR5uHvM',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    podTemplate: {
      $ref: '8VQBVoto93rwyDOqc4Ic3zpvE15YraSiR1tTv6eVfw',
    },
    resources: {
      $ref: 'WTrHEozz8qvtqxEWGa3Y9q5BV3C1NL3r8gT85STIrY',
    },
    retries: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sidecarOverrides: {
      $ref: 'KfYXGdySrNuXmNuGs4uFmQfBQde0oDMlsLPtpbghQ',
    },
    status: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    statusMessage: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    stepOverrides: {
      $ref: 'KfYXGdySrNuXmNuGs4uFmQfBQde0oDMlsLPtpbghQ',
    },
    taskRef: {
      $ref: '2FzxdVajGHzax7u6BCtVRAB8BBdG7TEjE9hlVA8Km0',
    },
    taskSpec: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    timeout: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    workspaces: {
      $ref: '0SRISnkTJoZ6lNKFacCe8MZS9g4PmJMW4QB4eHIUw',
    },
  },
  nullable: true,
};
const schema63 = {
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
const schema25 = {
  type: 'array',
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  nullable: true,
};
const schema26 = {
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
const schema6 = {
  type: 'string',
};
function validate21(
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
  validate21.errors = vErrors;
  return errors === 0;
}
const schema10 = {
  type: 'string',
  nullable: true,
};
function validate28(
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
  validate28.errors = vErrors;
  return errors === 0;
}
function validate66(
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
    if (data.request !== undefined) {
      if (
        !validate28(data.request, {
          instancePath: instancePath + '/request',
          parentData: data,
          parentDataProperty: 'request',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
  validate66.errors = vErrors;
  return errors === 0;
}
function validate65(
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
        !validate66(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate66.errors
            : vErrors.concat(validate66.errors);
        errors = vErrors.length;
      }
    }
  }
  validate65.errors = vErrors;
  return errors === 0;
}
const schema7 = {
  type: 'object',
  additionalProperties: {
    $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
  },
  properties: {},
  nullable: true,
};
const schema8 = {
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
const schema9 = {
  type: 'integer',
};
function validate24(
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
  validate24.errors = vErrors;
  return errors === 0;
}
const pattern0 =
  /^(\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))))?$/u;
function validate23(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate24(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs2 = errors;
    if (
      !validate21(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate21.errors
          : vErrors.concat(validate21.errors);
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
  validate23.errors = vErrors;
  return errors === 0;
}
function validate22(
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
        !validate23(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
function validate186(
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
        !validate65(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate22(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate22(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate186.errors = vErrors;
  return errors === 0;
}
const schema64 = {
  type: 'object',
  properties: {
    breakpoints: {
      $ref: 'egP7djp77mqG4q9UePqwq0NAJW6Ne632Kd1O6fHxLs',
    },
  },
  nullable: true,
};
const schema65 = {
  type: 'object',
  properties: {
    beforeSteps: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    onFailure: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
const schema12 = {
  type: 'array',
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  nullable: true,
};
function validate30(
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
        !validate21(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  validate30.errors = vErrors;
  return errors === 0;
}
function validate192(
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
    if (data.beforeSteps !== undefined) {
      if (
        !validate30(data.beforeSteps, {
          instancePath: instancePath + '/beforeSteps',
          parentData: data,
          parentDataProperty: 'beforeSteps',
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
    if (data.onFailure !== undefined) {
      if (
        !validate28(data.onFailure, {
          instancePath: instancePath + '/onFailure',
          parentData: data,
          parentDataProperty: 'onFailure',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate192.errors = vErrors;
  return errors === 0;
}
function validate191(
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
    if (data.breakpoints !== undefined) {
      if (
        !validate192(data.breakpoints, {
          instancePath: instancePath + '/breakpoints',
          parentData: data,
          parentDataProperty: 'breakpoints',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate192.errors
            : vErrors.concat(validate192.errors);
        errors = vErrors.length;
      }
    }
  }
  validate191.errors = vErrors;
  return errors === 0;
}
const schema30 = {
  type: 'array',
  items: {
    $ref: '9Io3ghMpg6A5V9ui8mWOQtmsEyRmTdvNEMe6HPIU',
  },
  nullable: true,
};
const schema31 = {
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
const schema11 = {};
function validate29(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  validate29.errors = null;
  return true;
}
function validate80(
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
        !validate29(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate80.errors = vErrors;
  return errors === 0;
}
function validate79(
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
        !validate80(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate79.errors = vErrors;
  return errors === 0;
}
const schema66 = {
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
const schema13 = {
  type: 'boolean',
  nullable: true,
};
function validate32(
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
  validate32.errors = vErrors;
  return errors === 0;
}
const schema67 = {
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
const schema68 = {
  type: 'array',
  items: {
    $ref: 'sWfncG59c1XfNxmkMXW89j5rdj0YnP54Zpfo5QkH10',
  },
  nullable: true,
};
const schema69 = {
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
function validate204(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== undefined) {
      if (
        !validate28(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
  validate204.errors = vErrors;
  return errors === 0;
}
function validate203(
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
        !validate204(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate204.errors
            : vErrors.concat(validate204.errors);
        errors = vErrors.length;
      }
    }
  }
  validate203.errors = vErrors;
  return errors === 0;
}
function validate201(
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
        !validate30(data.nameservers, {
          instancePath: instancePath + '/nameservers',
          parentData: data,
          parentDataProperty: 'nameservers',
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
    if (data.options !== undefined) {
      if (
        !validate203(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
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
    if (data.searches !== undefined) {
      if (
        !validate30(data.searches, {
          instancePath: instancePath + '/searches',
          parentData: data,
          parentDataProperty: 'searches',
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
  validate201.errors = vErrors;
  return errors === 0;
}
const schema70 = {
  type: 'array',
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  nullable: true,
};
const schema71 = {
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
const schema72 = {
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
const schema14 = {
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
const schema15 = {
  type: 'string',
  default: '',
  nullable: true,
};
function validate35(
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
  validate35.errors = vErrors;
  return errors === 0;
}
function validate33(
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
    if (data.name !== undefined) {
      if (
        !validate35(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate32(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate33.errors = vErrors;
  return errors === 0;
}
const schema38 = {
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
function validate100(
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
        !validate28(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.fieldPath !== undefined) {
      if (
        !validate21(data.fieldPath, {
          instancePath: instancePath + '/fieldPath',
          parentData: data,
          parentDataProperty: 'fieldPath',
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
  validate100.errors = vErrors;
  return errors === 0;
}
const schema39 = {
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
function validate103(
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
        !validate28(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.divisor !== undefined) {
      if (
        !validate23(data.divisor, {
          instancePath: instancePath + '/divisor',
          parentData: data,
          parentDataProperty: 'divisor',
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
    if (data.resource !== undefined) {
      if (
        !validate21(data.resource, {
          instancePath: instancePath + '/resource',
          parentData: data,
          parentDataProperty: 'resource',
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
  validate103.errors = vErrors;
  return errors === 0;
}
function validate217(
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
        !validate33(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate33.errors
            : vErrors.concat(validate33.errors);
        errors = vErrors.length;
      }
    }
    if (data.fieldRef !== undefined) {
      if (
        !validate100(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate103(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate103.errors
            : vErrors.concat(validate103.errors);
        errors = vErrors.length;
      }
    }
    if (data.secretKeyRef !== undefined) {
      if (
        !validate33(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate33.errors
            : vErrors.concat(validate33.errors);
        errors = vErrors.length;
      }
    }
  }
  validate217.errors = vErrors;
  return errors === 0;
}
function validate214(
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
        !validate28(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.valueFrom !== undefined) {
      if (
        !validate217(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate217.errors
            : vErrors.concat(validate217.errors);
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
  validate214.errors = vErrors;
  return errors === 0;
}
function validate213(
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
        !validate214(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate214.errors
            : vErrors.concat(validate214.errors);
        errors = vErrors.length;
      }
    }
  }
  validate213.errors = vErrors;
  return errors === 0;
}
const schema73 = {
  type: 'array',
  items: {
    $ref: 'IX3OlwxoKRMSjhCltCPJOVjPaBEO4EyMsvYuOuXjxQg',
  },
  nullable: true,
};
const schema74 = {
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
function validate226(
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
        !validate30(data.hostnames, {
          instancePath: instancePath + '/hostnames',
          parentData: data,
          parentDataProperty: 'hostnames',
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
    if (data.ip !== undefined) {
      if (
        !validate21(data.ip, {
          instancePath: instancePath + '/ip',
          parentData: data,
          parentDataProperty: 'ip',
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
  validate226.errors = vErrors;
  return errors === 0;
}
function validate225(
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
        !validate226(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate226.errors
            : vErrors.concat(validate226.errors);
        errors = vErrors.length;
      }
    }
  }
  validate225.errors = vErrors;
  return errors === 0;
}
const schema75 = {
  type: 'array',
  items: {
    $ref: 'lX4IaYIZZv1DIKZ67DpEDlNr31ePF1qx2EUDHqZRM4',
  },
  nullable: true,
};
const schema76 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
};
function validate233(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate35(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate233.errors = vErrors;
  return errors === 0;
}
function validate232(
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
        !validate233(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate233.errors
            : vErrors.concat(validate233.errors);
        errors = vErrors.length;
      }
    }
  }
  validate232.errors = vErrors;
  return errors === 0;
}
const schema16 = {
  type: 'object',
  additionalProperties: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  properties: {},
  nullable: true,
};
function validate38(
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
        !validate21(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
  validate38.errors = vErrors;
  return errors === 0;
}
const schema77 = {
  type: 'array',
  items: {
    $ref: 'Me3dAzCevo9JgluOcBf4PX5XcjXOHICBlAsWQglc',
  },
  nullable: true,
};
const schema78 = {
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
const schema41 = {
  type: 'integer',
  format: 'int64',
  nullable: true,
};
const formats2 = formats.int64;
function validate111(
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
  validate111.errors = vErrors;
  return errors === 0;
}
function validate243(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.effect !== undefined) {
      if (
        !validate28(data.effect, {
          instancePath: instancePath + '/effect',
          parentData: data,
          parentDataProperty: 'effect',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.key !== undefined) {
      if (
        !validate28(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.operator !== undefined) {
      if (
        !validate28(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.tolerationSeconds !== undefined) {
      if (
        !validate111(data.tolerationSeconds, {
          instancePath: instancePath + '/tolerationSeconds',
          parentData: data,
          parentDataProperty: 'tolerationSeconds',
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
    if (data.value !== undefined) {
      if (
        !validate28(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
  validate243.errors = vErrors;
  return errors === 0;
}
function validate242(
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
        !validate243(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate243.errors
            : vErrors.concat(validate243.errors);
        errors = vErrors.length;
      }
    }
  }
  validate242.errors = vErrors;
  return errors === 0;
}
const schema79 = {
  type: 'array',
  items: {
    $ref: 'PMEoIw3F1IPZaI9o7ckqeodb7BJ6q7Y2F6PDUm9sk',
  },
  nullable: true,
};
const schema80 = {
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
const schema33 = {
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
const schema34 = {
  type: 'array',
  items: {
    $ref: 'MkwwSDeYoT1APit7w8qsvbKCw8OynjINdeojyPgpPQ',
  },
  nullable: true,
};
const schema35 = {
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
function validate87(
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
    if (data.values !== undefined) {
      if (
        !validate30(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate87.errors = vErrors;
  return errors === 0;
}
function validate86(
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
        !validate87(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate87.errors
            : vErrors.concat(validate87.errors);
        errors = vErrors.length;
      }
    }
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
        !validate86(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
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
    if (data.matchLabels !== undefined) {
      if (
        !validate38(data.matchLabels, {
          instancePath: instancePath + '/matchLabels',
          parentData: data,
          parentDataProperty: 'matchLabels',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
  }
  validate85.errors = vErrors;
  return errors === 0;
}
const schema42 = {
  type: 'integer',
  format: 'int32',
};
const formats0 = formats.int32;
function validate112(
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
    if (!formats0.validate(data)) {
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
  validate112.errors = vErrors;
  return errors === 0;
}
const schema32 = {
  type: 'integer',
  format: 'int32',
  nullable: true,
};
function validate84(
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
  validate84.errors = vErrors;
  return errors === 0;
}
function validate252(
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
        !validate85(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
    if (data.matchLabelKeys !== undefined) {
      if (
        !validate30(data.matchLabelKeys, {
          instancePath: instancePath + '/matchLabelKeys',
          parentData: data,
          parentDataProperty: 'matchLabelKeys',
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
    if (data.maxSkew !== undefined) {
      if (
        !validate112(data.maxSkew, {
          instancePath: instancePath + '/maxSkew',
          parentData: data,
          parentDataProperty: 'maxSkew',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate112.errors
            : vErrors.concat(validate112.errors);
        errors = vErrors.length;
      }
    }
    if (data.minDomains !== undefined) {
      if (
        !validate84(data.minDomains, {
          instancePath: instancePath + '/minDomains',
          parentData: data,
          parentDataProperty: 'minDomains',
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
    if (data.nodeAffinityPolicy !== undefined) {
      if (
        !validate28(data.nodeAffinityPolicy, {
          instancePath: instancePath + '/nodeAffinityPolicy',
          parentData: data,
          parentDataProperty: 'nodeAffinityPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodeTaintsPolicy !== undefined) {
      if (
        !validate28(data.nodeTaintsPolicy, {
          instancePath: instancePath + '/nodeTaintsPolicy',
          parentData: data,
          parentDataProperty: 'nodeTaintsPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.topologyKey !== undefined) {
      if (
        !validate21(data.topologyKey, {
          instancePath: instancePath + '/topologyKey',
          parentData: data,
          parentDataProperty: 'topologyKey',
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
    if (data.whenUnsatisfiable !== undefined) {
      if (
        !validate21(data.whenUnsatisfiable, {
          instancePath: instancePath + '/whenUnsatisfiable',
          parentData: data,
          parentDataProperty: 'whenUnsatisfiable',
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
  validate252.errors = vErrors;
  return errors === 0;
}
function validate251(
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
        !validate252(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate252.errors
            : vErrors.concat(validate252.errors);
        errors = vErrors.length;
      }
    }
  }
  validate251.errors = vErrors;
  return errors === 0;
}
function validate198(
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
        !validate29(data.affinity, {
          instancePath: instancePath + '/affinity',
          parentData: data,
          parentDataProperty: 'affinity',
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
    if (data.automountServiceAccountToken !== undefined) {
      if (
        !validate32(data.automountServiceAccountToken, {
          instancePath: instancePath + '/automountServiceAccountToken',
          parentData: data,
          parentDataProperty: 'automountServiceAccountToken',
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
    if (data.dnsConfig !== undefined) {
      if (
        !validate201(data.dnsConfig, {
          instancePath: instancePath + '/dnsConfig',
          parentData: data,
          parentDataProperty: 'dnsConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate201.errors
            : vErrors.concat(validate201.errors);
        errors = vErrors.length;
      }
    }
    if (data.dnsPolicy !== undefined) {
      if (
        !validate28(data.dnsPolicy, {
          instancePath: instancePath + '/dnsPolicy',
          parentData: data,
          parentDataProperty: 'dnsPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableServiceLinks !== undefined) {
      if (
        !validate32(data.enableServiceLinks, {
          instancePath: instancePath + '/enableServiceLinks',
          parentData: data,
          parentDataProperty: 'enableServiceLinks',
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
    if (data.env !== undefined) {
      if (
        !validate213(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate213.errors
            : vErrors.concat(validate213.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostAliases !== undefined) {
      if (
        !validate225(data.hostAliases, {
          instancePath: instancePath + '/hostAliases',
          parentData: data,
          parentDataProperty: 'hostAliases',
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
    if (data.hostNetwork !== undefined) {
      if (
        !validate32(data.hostNetwork, {
          instancePath: instancePath + '/hostNetwork',
          parentData: data,
          parentDataProperty: 'hostNetwork',
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
    if (data.imagePullSecrets !== undefined) {
      if (
        !validate232(data.imagePullSecrets, {
          instancePath: instancePath + '/imagePullSecrets',
          parentData: data,
          parentDataProperty: 'imagePullSecrets',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate232.errors
            : vErrors.concat(validate232.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodeSelector !== undefined) {
      if (
        !validate38(data.nodeSelector, {
          instancePath: instancePath + '/nodeSelector',
          parentData: data,
          parentDataProperty: 'nodeSelector',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
    if (data.priorityClassName !== undefined) {
      if (
        !validate28(data.priorityClassName, {
          instancePath: instancePath + '/priorityClassName',
          parentData: data,
          parentDataProperty: 'priorityClassName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.runtimeClassName !== undefined) {
      if (
        !validate28(data.runtimeClassName, {
          instancePath: instancePath + '/runtimeClassName',
          parentData: data,
          parentDataProperty: 'runtimeClassName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.schedulerName !== undefined) {
      if (
        !validate28(data.schedulerName, {
          instancePath: instancePath + '/schedulerName',
          parentData: data,
          parentDataProperty: 'schedulerName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.securityContext !== undefined) {
      if (
        !validate29(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
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
    if (data.tolerations !== undefined) {
      if (
        !validate242(data.tolerations, {
          instancePath: instancePath + '/tolerations',
          parentData: data,
          parentDataProperty: 'tolerations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate242.errors
            : vErrors.concat(validate242.errors);
        errors = vErrors.length;
      }
    }
    if (data.topologySpreadConstraints !== undefined) {
      if (
        !validate251(data.topologySpreadConstraints, {
          instancePath: instancePath + '/topologySpreadConstraints',
          parentData: data,
          parentDataProperty: 'topologySpreadConstraints',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate251.errors
            : vErrors.concat(validate251.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumes !== undefined) {
      if (
        !validate29(data.volumes, {
          instancePath: instancePath + '/volumes',
          parentData: data,
          parentDataProperty: 'volumes',
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
  validate198.errors = vErrors;
  return errors === 0;
}
const schema81 = {
  type: 'object',
  properties: {
    inputs: {
      $ref: 'gFH0XWTfIXY3GKihMj4UAan33rUZAQWyfy3n2Pzk7I',
    },
    outputs: {
      $ref: 'gFH0XWTfIXY3GKihMj4UAan33rUZAQWyfy3n2Pzk7I',
    },
  },
  nullable: true,
};
const schema17 = {
  type: 'array',
  items: {
    $ref: 'ABcIllFX88AizTbhsnsaNEm90RgfZdC5w9MydhcvJ3Y',
  },
  nullable: true,
};
const schema18 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    paths: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    resourceRef: {
      $ref: 'lsPFcPRwRBtaiYr3R9vjIVcU8EdgMxR68gpY16H6Yg',
    },
    resourceSpec: {
      $ref: '2AIdQ032iOQdm6yw46GWkC636MGvC9r4xb0IceugA',
    },
  },
};
const schema19 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate44(
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
        !validate28(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate44.errors = vErrors;
  return errors === 0;
}
const schema20 = {
  type: 'object',
  required: ['params', 'type'],
  properties: {
    params: {
      $ref: 'tKviKwnNVFKMlnxeJCZvXXp2i0UVQceNJdkO5dcx2I',
    },
    secrets: {
      $ref: 'YZGxouYvzwnNn4UiOZhEmeISk2A0G6QqoHKV3ZZhX4',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  nullable: true,
};
const schema21 = {
  type: 'array',
  items: {
    $ref: 'RI8VVk8l4SnLWK7FbWs0RBoAVoSBUKkroMUjUfsI',
  },
};
const schema22 = {
  type: 'object',
  required: ['name', 'value'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    value: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate50(
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
  validate50.errors = vErrors;
  return errors === 0;
}
function validate49(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate50(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  validate49.errors = vErrors;
  return errors === 0;
}
const schema23 = {
  type: 'array',
  items: {
    $ref: 'sZI6OxgRDpceKyXkJ8lI3Aiu2ocnyzLxeIMSj3GwI',
  },
  nullable: true,
};
const schema24 = {
  type: 'object',
  required: ['fieldName', 'secretKey', 'secretName'],
  properties: {
    fieldName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    secretKey: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    secretName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate56(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.fieldName === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'fieldName',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.secretKey === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'secretKey',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.secretName === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'secretName',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.fieldName !== undefined) {
      if (
        !validate21(data.fieldName, {
          instancePath: instancePath + '/fieldName',
          parentData: data,
          parentDataProperty: 'fieldName',
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
    if (data.secretKey !== undefined) {
      if (
        !validate21(data.secretKey, {
          instancePath: instancePath + '/secretKey',
          parentData: data,
          parentDataProperty: 'secretKey',
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
  validate56.errors = vErrors;
  return errors === 0;
}
function validate55(
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
        !validate56(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate56.errors
            : vErrors.concat(validate56.errors);
        errors = vErrors.length;
      }
    }
  }
  validate55.errors = vErrors;
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
    if (data.params === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'params',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.type === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'type',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.params !== undefined) {
      if (
        !validate49(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate49.errors
            : vErrors.concat(validate49.errors);
        errors = vErrors.length;
      }
    }
    if (data.secrets !== undefined) {
      if (
        !validate55(data.secrets, {
          instancePath: instancePath + '/secrets',
          parentData: data,
          parentDataProperty: 'secrets',
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
    if (data.type !== undefined) {
      if (
        !validate21(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
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
  validate48.errors = vErrors;
  return errors === 0;
}
function validate41(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.paths !== undefined) {
      if (
        !validate30(data.paths, {
          instancePath: instancePath + '/paths',
          parentData: data,
          parentDataProperty: 'paths',
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
    if (data.resourceRef !== undefined) {
      if (
        !validate44(data.resourceRef, {
          instancePath: instancePath + '/resourceRef',
          parentData: data,
          parentDataProperty: 'resourceRef',
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
    if (data.resourceSpec !== undefined) {
      if (
        !validate48(data.resourceSpec, {
          instancePath: instancePath + '/resourceSpec',
          parentData: data,
          parentDataProperty: 'resourceSpec',
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
  validate41.errors = vErrors;
  return errors === 0;
}
function validate40(
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
        !validate41(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate41.errors
            : vErrors.concat(validate41.errors);
        errors = vErrors.length;
      }
    }
  }
  validate40.errors = vErrors;
  return errors === 0;
}
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
    if (data.inputs !== undefined) {
      if (
        !validate40(data.inputs, {
          instancePath: instancePath + '/inputs',
          parentData: data,
          parentDataProperty: 'inputs',
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
    if (data.outputs !== undefined) {
      if (
        !validate40(data.outputs, {
          instancePath: instancePath + '/outputs',
          parentData: data,
          parentDataProperty: 'outputs',
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
  validate265.errors = vErrors;
  return errors === 0;
}
const schema44 = {
  type: 'integer',
  nullable: true,
};
function validate114(
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
  validate114.errors = vErrors;
  return errors === 0;
}
const schema27 = {
  type: 'array',
  items: {
    $ref: 'Yge9QQ8OsJLIjNyTBsoZvCTHNhyFnHHVCBY89ZRzQ',
  },
  nullable: true,
};
const schema28 = {
  type: 'object',
  required: ['name', 'resources'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resources: {
      $ref: 'j1YjqCeocXqlKk4JIGLnhEGmmJ6c7jgfb8B4SmaCgNc',
    },
  },
};
const schema29 = {
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
function validate73(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.claims !== undefined) {
      if (
        !validate65(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate22(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate22(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate73.errors = vErrors;
  return errors === 0;
}
function validate71(
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
    if (data.resources === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'resources',
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
    if (data.resources !== undefined) {
      if (
        !validate73(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate73.errors
            : vErrors.concat(validate73.errors);
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
  validate71.errors = vErrors;
  return errors === 0;
}
function validate70(
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
        !validate71(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate71.errors
            : vErrors.concat(validate71.errors);
        errors = vErrors.length;
      }
    }
  }
  validate70.errors = vErrors;
  return errors === 0;
}
const schema82 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    bundle: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    kind: {
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
function validate275(
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
        !validate28(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.bundle !== undefined) {
      if (
        !validate28(data.bundle, {
          instancePath: instancePath + '/bundle',
          parentData: data,
          parentDataProperty: 'bundle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate28(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.params !== undefined) {
      if (
        !validate79(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate79.errors
            : vErrors.concat(validate79.errors);
        errors = vErrors.length;
      }
    }
    if (data.resolver !== undefined) {
      if (
        !validate28(data.resolver, {
          instancePath: instancePath + '/resolver',
          parentData: data,
          parentDataProperty: 'resolver',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate275.errors = vErrors;
  return errors === 0;
}
const schema83 = {
  type: 'array',
  items: {
    $ref: 'pbI2wQ0FVF5d8RbWov7wdwRzVG8Hm8lGG7TXQrZzUI',
  },
  nullable: true,
};
const schema84 = {
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
const schema85 = {
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
const schema36 = {
  type: 'array',
  items: {
    $ref: 'KZm4JRWtb68G65niEVa35cCfAyEYRWGkoaumd8EY',
  },
  nullable: true,
};
const schema37 = {
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
function validate95(
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
    if (data.mode !== undefined) {
      if (
        !validate84(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
    if (data.path !== undefined) {
      if (
        !validate21(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
  validate95.errors = vErrors;
  return errors === 0;
}
function validate94(
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
        !validate95(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate95.errors
            : vErrors.concat(validate95.errors);
        errors = vErrors.length;
      }
    }
  }
  validate94.errors = vErrors;
  return errors === 0;
}
function validate287(
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
        !validate84(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate94(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.name !== undefined) {
      if (
        !validate35(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate32(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate287.errors = vErrors;
  return errors === 0;
}
const schema86 = {
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
const schema87 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  nullable: true,
};
function validate296(
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
        !validate35(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate296.errors = vErrors;
  return errors === 0;
}
function validate293(
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
        !validate21(data.driver, {
          instancePath: instancePath + '/driver',
          parentData: data,
          parentDataProperty: 'driver',
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
    if (data.fsType !== undefined) {
      if (
        !validate28(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodePublishSecretRef !== undefined) {
      if (
        !validate296(data.nodePublishSecretRef, {
          instancePath: instancePath + '/nodePublishSecretRef',
          parentData: data,
          parentDataProperty: 'nodePublishSecretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate296.errors
            : vErrors.concat(validate296.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnly !== undefined) {
      if (
        !validate32(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.volumeAttributes !== undefined) {
      if (
        !validate38(data.volumeAttributes, {
          instancePath: instancePath + '/volumeAttributes',
          parentData: data,
          parentDataProperty: 'volumeAttributes',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
  }
  validate293.errors = vErrors;
  return errors === 0;
}
const schema88 = {
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
    if (data.medium !== undefined) {
      if (
        !validate28(data.medium, {
          instancePath: instancePath + '/medium',
          parentData: data,
          parentDataProperty: 'medium',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.sizeLimit !== undefined) {
      if (
        !validate23(data.sizeLimit, {
          instancePath: instancePath + '/sizeLimit',
          parentData: data,
          parentDataProperty: 'sizeLimit',
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
  validate302.errors = vErrors;
  return errors === 0;
}
const schema89 = {
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
function validate307(
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
        !validate21(data.claimName, {
          instancePath: instancePath + '/claimName',
          parentData: data,
          parentDataProperty: 'claimName',
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
    if (data.readOnly !== undefined) {
      if (
        !validate32(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate307.errors = vErrors;
  return errors === 0;
}
const schema90 = {
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
const schema91 = {
  type: 'array',
  items: {
    $ref: 'WICQ5kdq9kT3ygPK1xgAXHZR3qlzTXRJaybZiIbakk',
  },
  nullable: true,
};
const schema92 = {
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
const schema93 = {
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
function validate315(
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
        !validate85(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.optional !== undefined) {
      if (
        !validate32(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.path !== undefined) {
      if (
        !validate21(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.signerName !== undefined) {
      if (
        !validate28(data.signerName, {
          instancePath: instancePath + '/signerName',
          parentData: data,
          parentDataProperty: 'signerName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate315.errors = vErrors;
  return errors === 0;
}
const schema40 = {
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
function validate107(
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
        !validate94(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.name !== undefined) {
      if (
        !validate35(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate32(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate107.errors = vErrors;
  return errors === 0;
}
const schema94 = {
  type: 'object',
  properties: {
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  nullable: true,
};
const schema95 = {
  type: 'array',
  items: {
    $ref: '83t6EKcTjvzxVMR8ob3sMZu0lIqxm1azYctskfY5Ks4',
  },
  nullable: true,
};
const schema96 = {
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
function validate325(
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
        !validate100(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.mode !== undefined) {
      if (
        !validate84(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
    if (data.path !== undefined) {
      if (
        !validate21(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate103(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate103.errors
            : vErrors.concat(validate103.errors);
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
  validate325.errors = vErrors;
  return errors === 0;
}
function validate324(
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
        !validate325(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate325.errors
            : vErrors.concat(validate325.errors);
        errors = vErrors.length;
      }
    }
  }
  validate324.errors = vErrors;
  return errors === 0;
}
function validate323(
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
        !validate324(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate324.errors
            : vErrors.concat(validate324.errors);
        errors = vErrors.length;
      }
    }
  }
  validate323.errors = vErrors;
  return errors === 0;
}
const schema97 = {
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
function validate334(
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
        !validate28(data.audience, {
          instancePath: instancePath + '/audience',
          parentData: data,
          parentDataProperty: 'audience',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.expirationSeconds !== undefined) {
      if (
        !validate111(data.expirationSeconds, {
          instancePath: instancePath + '/expirationSeconds',
          parentData: data,
          parentDataProperty: 'expirationSeconds',
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
    if (data.path !== undefined) {
      if (
        !validate21(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
  validate334.errors = vErrors;
  return errors === 0;
}
function validate314(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.clusterTrustBundle !== undefined) {
      if (
        !validate315(data.clusterTrustBundle, {
          instancePath: instancePath + '/clusterTrustBundle',
          parentData: data,
          parentDataProperty: 'clusterTrustBundle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate315.errors
            : vErrors.concat(validate315.errors);
        errors = vErrors.length;
      }
    }
    if (data.configMap !== undefined) {
      if (
        !validate107(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate107.errors
            : vErrors.concat(validate107.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate323(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate323.errors
            : vErrors.concat(validate323.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate107(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate107.errors
            : vErrors.concat(validate107.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountToken !== undefined) {
      if (
        !validate334(data.serviceAccountToken, {
          instancePath: instancePath + '/serviceAccountToken',
          parentData: data,
          parentDataProperty: 'serviceAccountToken',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate334.errors
            : vErrors.concat(validate334.errors);
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
  validate314.errors = vErrors;
  return errors === 0;
}
function validate313(
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
        !validate314(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate314.errors
            : vErrors.concat(validate314.errors);
        errors = vErrors.length;
      }
    }
  }
  validate313.errors = vErrors;
  return errors === 0;
}
function validate311(
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
        !validate84(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.sources !== undefined) {
      if (
        !validate313(data.sources, {
          instancePath: instancePath + '/sources',
          parentData: data,
          parentDataProperty: 'sources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate313.errors
            : vErrors.concat(validate313.errors);
        errors = vErrors.length;
      }
    }
  }
  validate311.errors = vErrors;
  return errors === 0;
}
const schema98 = {
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
function validate342(
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
        !validate84(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate94(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.optional !== undefined) {
      if (
        !validate32(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.secretName !== undefined) {
      if (
        !validate28(data.secretName, {
          instancePath: instancePath + '/secretName',
          parentData: data,
          parentDataProperty: 'secretName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate342.errors = vErrors;
  return errors === 0;
}
function validate286(
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
        !validate287(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate287.errors
            : vErrors.concat(validate287.errors);
        errors = vErrors.length;
      }
    }
    if (data.csi !== undefined) {
      if (
        !validate293(data.csi, {
          instancePath: instancePath + '/csi',
          parentData: data,
          parentDataProperty: 'csi',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate293.errors
            : vErrors.concat(validate293.errors);
        errors = vErrors.length;
      }
    }
    if (data.emptyDir !== undefined) {
      if (
        !validate302(data.emptyDir, {
          instancePath: instancePath + '/emptyDir',
          parentData: data,
          parentDataProperty: 'emptyDir',
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
    if (data.persistentVolumeClaim !== undefined) {
      if (
        !validate307(data.persistentVolumeClaim, {
          instancePath: instancePath + '/persistentVolumeClaim',
          parentData: data,
          parentDataProperty: 'persistentVolumeClaim',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate307.errors
            : vErrors.concat(validate307.errors);
        errors = vErrors.length;
      }
    }
    if (data.projected !== undefined) {
      if (
        !validate311(data.projected, {
          instancePath: instancePath + '/projected',
          parentData: data,
          parentDataProperty: 'projected',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate311.errors
            : vErrors.concat(validate311.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate342(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate342.errors
            : vErrors.concat(validate342.errors);
        errors = vErrors.length;
      }
    }
    if (data.subPath !== undefined) {
      if (
        !validate28(data.subPath, {
          instancePath: instancePath + '/subPath',
          parentData: data,
          parentDataProperty: 'subPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeClaimTemplate !== undefined) {
      if (
        !validate29(data.volumeClaimTemplate, {
          instancePath: instancePath + '/volumeClaimTemplate',
          parentData: data,
          parentDataProperty: 'volumeClaimTemplate',
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
  validate286.errors = vErrors;
  return errors === 0;
}
function validate285(
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
        !validate286(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate286.errors
            : vErrors.concat(validate286.errors);
        errors = vErrors.length;
      }
    }
  }
  validate285.errors = vErrors;
  return errors === 0;
}
function validate185(
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
    if (data.computeResources !== undefined) {
      if (
        !validate186(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate186.errors
            : vErrors.concat(validate186.errors);
        errors = vErrors.length;
      }
    }
    if (data.debug !== undefined) {
      if (
        !validate191(data.debug, {
          instancePath: instancePath + '/debug',
          parentData: data,
          parentDataProperty: 'debug',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate191.errors
            : vErrors.concat(validate191.errors);
        errors = vErrors.length;
      }
    }
    if (data.params !== undefined) {
      if (
        !validate79(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate79.errors
            : vErrors.concat(validate79.errors);
        errors = vErrors.length;
      }
    }
    if (data.podTemplate !== undefined) {
      if (
        !validate198(data.podTemplate, {
          instancePath: instancePath + '/podTemplate',
          parentData: data,
          parentDataProperty: 'podTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate198.errors
            : vErrors.concat(validate198.errors);
        errors = vErrors.length;
      }
    }
    if (data.resources !== undefined) {
      if (
        !validate265(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
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
    if (data.retries !== undefined) {
      if (
        !validate114(data.retries, {
          instancePath: instancePath + '/retries',
          parentData: data,
          parentDataProperty: 'retries',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate114.errors
            : vErrors.concat(validate114.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountName !== undefined) {
      if (
        !validate28(data.serviceAccountName, {
          instancePath: instancePath + '/serviceAccountName',
          parentData: data,
          parentDataProperty: 'serviceAccountName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.sidecarOverrides !== undefined) {
      if (
        !validate70(data.sidecarOverrides, {
          instancePath: instancePath + '/sidecarOverrides',
          parentData: data,
          parentDataProperty: 'sidecarOverrides',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate70.errors
            : vErrors.concat(validate70.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (
        !validate28(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.statusMessage !== undefined) {
      if (
        !validate28(data.statusMessage, {
          instancePath: instancePath + '/statusMessage',
          parentData: data,
          parentDataProperty: 'statusMessage',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.stepOverrides !== undefined) {
      if (
        !validate70(data.stepOverrides, {
          instancePath: instancePath + '/stepOverrides',
          parentData: data,
          parentDataProperty: 'stepOverrides',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate70.errors
            : vErrors.concat(validate70.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskRef !== undefined) {
      if (
        !validate275(data.taskRef, {
          instancePath: instancePath + '/taskRef',
          parentData: data,
          parentDataProperty: 'taskRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate275.errors
            : vErrors.concat(validate275.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskSpec !== undefined) {
      if (
        !validate29(data.taskSpec, {
          instancePath: instancePath + '/taskSpec',
          parentData: data,
          parentDataProperty: 'taskSpec',
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
    if (data.timeout !== undefined) {
      if (
        !validate28(data.timeout, {
          instancePath: instancePath + '/timeout',
          parentData: data,
          parentDataProperty: 'timeout',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.workspaces !== undefined) {
      if (
        !validate285(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate285.errors
            : vErrors.concat(validate285.errors);
        errors = vErrors.length;
      }
    }
  }
  validate185.errors = vErrors;
  return errors === 0;
}
const schema99 = {
  type: 'object',
  required: ['podName'],
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    cloudEvents: {
      $ref: 'os1v52UUX918oMgqMaE7RQsRfSbjymzvVn7jO50fzs',
    },
    completionTime: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
    conditions: {
      $ref: 'pDZ5TS4rKMc9yWpKfve3PLPuyE0AyffnVF24ZS7o7w',
    },
    observedGeneration: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    podName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    provenance: {
      $ref: 'pX87U6IISrjcFHVSDxKohY7s4qONdhwgOGrg1kUA',
    },
    resourcesResult: {
      $ref: 'k2DlULtgmpiMoc1JdeIicqp7Sb6kTkDw05a5pb8tng',
    },
    retriesStatus: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    sidecars: {
      $ref: '8TuWJmURVm0Z7K0vLjly1C2PwMQxHBQhcd6IrlskSnw',
    },
    spanContext: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    startTime: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
    steps: {
      $ref: '1YWKw1mrov3rdt5JuC8u2zKLtdwQSRzUguLXcEcGSM',
    },
    taskResults: {
      $ref: 'LgAFLyqYQzBTuzhZMRq8N81uDZDX1YRxwqwfG6adGk',
    },
    taskSpec: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
  nullable: true,
};
const schema100 = {
  type: 'array',
  items: {
    $ref: 'lwSBavrB0j7VgjwdSOtDQXzoxB0DjRmQ4pnYnvoICY',
  },
  nullable: true,
};
const schema101 = {
  type: 'object',
  properties: {
    status: {
      $ref: 'wmTaRLiBHt53YA0AcjSFQd4IUiJNQAnkDvAEzVcRGY',
    },
    target: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
const schema102 = {
  type: 'object',
  required: ['message', 'retryCount'],
  properties: {
    condition: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    message: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    retryCount: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    sentAt: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
  },
  nullable: true,
};
const schema43 = {
  type: 'string',
  format: 'date-time',
  nullable: true,
};
const formats6 = formats['date-time'];
function validate113(
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
  validate113.errors = vErrors;
  return errors === 0;
}
function validate357(
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
    if (data.message === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'message',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.retryCount === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'retryCount',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.condition !== undefined) {
      if (
        !validate28(data.condition, {
          instancePath: instancePath + '/condition',
          parentData: data,
          parentDataProperty: 'condition',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
    if (data.retryCount !== undefined) {
      if (
        !validate112(data.retryCount, {
          instancePath: instancePath + '/retryCount',
          parentData: data,
          parentDataProperty: 'retryCount',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate112.errors
            : vErrors.concat(validate112.errors);
        errors = vErrors.length;
      }
    }
    if (data.sentAt !== undefined) {
      if (
        !validate113(data.sentAt, {
          instancePath: instancePath + '/sentAt',
          parentData: data,
          parentDataProperty: 'sentAt',
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
  validate357.errors = vErrors;
  return errors === 0;
}
function validate356(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.status !== undefined) {
      if (
        !validate357(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate357.errors
            : vErrors.concat(validate357.errors);
        errors = vErrors.length;
      }
    }
    if (data.target !== undefined) {
      if (
        !validate28(data.target, {
          instancePath: instancePath + '/target',
          parentData: data,
          parentDataProperty: 'target',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
  validate356.errors = vErrors;
  return errors === 0;
}
function validate355(
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
        !validate356(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate356.errors
            : vErrors.concat(validate356.errors);
        errors = vErrors.length;
      }
    }
  }
  validate355.errors = vErrors;
  return errors === 0;
}
const schema103 = {
  type: 'array',
  items: {
    $ref: 'wbr2E4NheEu4hYPlq9gH96fDqOeJ0hkPnqS5qesgw',
  },
  nullable: true,
};
const schema104 = {
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
function validate368(
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
        !validate28(data.lastTransitionTime, {
          instancePath: instancePath + '/lastTransitionTime',
          parentData: data,
          parentDataProperty: 'lastTransitionTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.message !== undefined) {
      if (
        !validate28(data.message, {
          instancePath: instancePath + '/message',
          parentData: data,
          parentDataProperty: 'message',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== undefined) {
      if (
        !validate28(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.severity !== undefined) {
      if (
        !validate28(data.severity, {
          instancePath: instancePath + '/severity',
          parentData: data,
          parentDataProperty: 'severity',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
    if (data.type !== undefined) {
      if (
        !validate21(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
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
  validate368.errors = vErrors;
  return errors === 0;
}
function validate367(
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
        !validate368(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate368.errors
            : vErrors.concat(validate368.errors);
        errors = vErrors.length;
      }
    }
  }
  validate367.errors = vErrors;
  return errors === 0;
}
const schema50 = {
  type: 'object',
  properties: {
    configSource: {
      $ref: 'yBOuEehMG3lG3Dk0iLRM7CQ86QHVvUeGzVboVFKUAg',
    },
    featureFlags: {
      $ref: 'MeroYSoY3eGOZhWxlxL9tiztfQqGautXt9z29A4kQkQ',
    },
    refSource: {
      $ref: 'yBOuEehMG3lG3Dk0iLRM7CQ86QHVvUeGzVboVFKUAg',
    },
  },
  nullable: true,
};
const schema45 = {
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
function validate115(
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
        !validate38(data.digest, {
          instancePath: instancePath + '/digest',
          parentData: data,
          parentDataProperty: 'digest',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
    if (data.entryPoint !== undefined) {
      if (
        !validate28(data.entryPoint, {
          instancePath: instancePath + '/entryPoint',
          parentData: data,
          parentDataProperty: 'entryPoint',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.uri !== undefined) {
      if (
        !validate28(data.uri, {
          instancePath: instancePath + '/uri',
          parentData: data,
          parentDataProperty: 'uri',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate115.errors = vErrors;
  return errors === 0;
}
const schema51 = {
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
function validate132(
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
        !validate32(data.awaitSidecarReadiness, {
          instancePath: instancePath + '/awaitSidecarReadiness',
          parentData: data,
          parentDataProperty: 'awaitSidecarReadiness',
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
    if (data.coschedule !== undefined) {
      if (
        !validate28(data.coschedule, {
          instancePath: instancePath + '/coschedule',
          parentData: data,
          parentDataProperty: 'coschedule',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.disableCredsInit !== undefined) {
      if (
        !validate32(data.disableCredsInit, {
          instancePath: instancePath + '/disableCredsInit',
          parentData: data,
          parentDataProperty: 'disableCredsInit',
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
    if (data.disableInlineSpec !== undefined) {
      if (
        !validate28(data.disableInlineSpec, {
          instancePath: instancePath + '/disableInlineSpec',
          parentData: data,
          parentDataProperty: 'disableInlineSpec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableAPIFields !== undefined) {
      if (
        !validate28(data.enableAPIFields, {
          instancePath: instancePath + '/enableAPIFields',
          parentData: data,
          parentDataProperty: 'enableAPIFields',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.enableArtifacts !== undefined) {
      if (
        !validate32(data.enableArtifacts, {
          instancePath: instancePath + '/enableArtifacts',
          parentData: data,
          parentDataProperty: 'enableArtifacts',
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
    if (data.enableCELInWhenExpression !== undefined) {
      if (
        !validate32(data.enableCELInWhenExpression, {
          instancePath: instancePath + '/enableCELInWhenExpression',
          parentData: data,
          parentDataProperty: 'enableCELInWhenExpression',
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
    if (data.enableConciseResolverSyntax !== undefined) {
      if (
        !validate32(data.enableConciseResolverSyntax, {
          instancePath: instancePath + '/enableConciseResolverSyntax',
          parentData: data,
          parentDataProperty: 'enableConciseResolverSyntax',
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
    if (data.enableKeepPodOnCancel !== undefined) {
      if (
        !validate32(data.enableKeepPodOnCancel, {
          instancePath: instancePath + '/enableKeepPodOnCancel',
          parentData: data,
          parentDataProperty: 'enableKeepPodOnCancel',
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
    if (data.enableKubernetesSidecar !== undefined) {
      if (
        !validate32(data.enableKubernetesSidecar, {
          instancePath: instancePath + '/enableKubernetesSidecar',
          parentData: data,
          parentDataProperty: 'enableKubernetesSidecar',
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
    if (data.enableParamEnum !== undefined) {
      if (
        !validate32(data.enableParamEnum, {
          instancePath: instancePath + '/enableParamEnum',
          parentData: data,
          parentDataProperty: 'enableParamEnum',
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
    if (data.enableProvenanceInStatus !== undefined) {
      if (
        !validate32(data.enableProvenanceInStatus, {
          instancePath: instancePath + '/enableProvenanceInStatus',
          parentData: data,
          parentDataProperty: 'enableProvenanceInStatus',
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
    if (data.enableStepActions !== undefined) {
      if (
        !validate32(data.enableStepActions, {
          instancePath: instancePath + '/enableStepActions',
          parentData: data,
          parentDataProperty: 'enableStepActions',
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
    if (data.enforceNonfalsifiability !== undefined) {
      if (
        !validate28(data.enforceNonfalsifiability, {
          instancePath: instancePath + '/enforceNonfalsifiability',
          parentData: data,
          parentDataProperty: 'enforceNonfalsifiability',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.maxResultSize !== undefined) {
      if (
        !validate114(data.maxResultSize, {
          instancePath: instancePath + '/maxResultSize',
          parentData: data,
          parentDataProperty: 'maxResultSize',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate114.errors
            : vErrors.concat(validate114.errors);
        errors = vErrors.length;
      }
    }
    if (data.requireGitSSHSecretKnownHosts !== undefined) {
      if (
        !validate32(data.requireGitSSHSecretKnownHosts, {
          instancePath: instancePath + '/requireGitSSHSecretKnownHosts',
          parentData: data,
          parentDataProperty: 'requireGitSSHSecretKnownHosts',
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
    if (data.resultExtractionMethod !== undefined) {
      if (
        !validate28(data.resultExtractionMethod, {
          instancePath: instancePath + '/resultExtractionMethod',
          parentData: data,
          parentDataProperty: 'resultExtractionMethod',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.runningInEnvWithInjectedSidecars !== undefined) {
      if (
        !validate32(data.runningInEnvWithInjectedSidecars, {
          instancePath: instancePath + '/runningInEnvWithInjectedSidecars',
          parentData: data,
          parentDataProperty: 'runningInEnvWithInjectedSidecars',
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
    if (data.sendCloudEventsForRuns !== undefined) {
      if (
        !validate32(data.sendCloudEventsForRuns, {
          instancePath: instancePath + '/sendCloudEventsForRuns',
          parentData: data,
          parentDataProperty: 'sendCloudEventsForRuns',
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
    if (data.setSecurityContext !== undefined) {
      if (
        !validate32(data.setSecurityContext, {
          instancePath: instancePath + '/setSecurityContext',
          parentData: data,
          parentDataProperty: 'setSecurityContext',
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
    if (data.setSecurityContextReadOnlyRootFilesystem !== undefined) {
      if (
        !validate32(data.setSecurityContextReadOnlyRootFilesystem, {
          instancePath:
            instancePath + '/setSecurityContextReadOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'setSecurityContextReadOnlyRootFilesystem',
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
    if (data.verificationNoMatchPolicy !== undefined) {
      if (
        !validate28(data.verificationNoMatchPolicy, {
          instancePath: instancePath + '/verificationNoMatchPolicy',
          parentData: data,
          parentDataProperty: 'verificationNoMatchPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate132.errors = vErrors;
  return errors === 0;
}
function validate130(
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
    if (data.configSource !== undefined) {
      if (
        !validate115(data.configSource, {
          instancePath: instancePath + '/configSource',
          parentData: data,
          parentDataProperty: 'configSource',
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
    if (data.featureFlags !== undefined) {
      if (
        !validate132(data.featureFlags, {
          instancePath: instancePath + '/featureFlags',
          parentData: data,
          parentDataProperty: 'featureFlags',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate132.errors
            : vErrors.concat(validate132.errors);
        errors = vErrors.length;
      }
    }
    if (data.refSource !== undefined) {
      if (
        !validate115(data.refSource, {
          instancePath: instancePath + '/refSource',
          parentData: data,
          parentDataProperty: 'refSource',
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
  }
  validate130.errors = vErrors;
  return errors === 0;
}
const schema105 = {
  type: 'array',
  items: {
    $ref: 'zIiABWdTcFWnGiqpsSKhqptiflRZ4WlnEBFjGKebZZw',
  },
  nullable: true,
};
const schema106 = {
  type: 'object',
  required: ['key', 'value'],
  properties: {
    key: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resourceName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    type: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    value: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate381(
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
    if (data.resourceName !== undefined) {
      if (
        !validate28(data.resourceName, {
          instancePath: instancePath + '/resourceName',
          parentData: data,
          parentDataProperty: 'resourceName',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate114(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate114.errors
            : vErrors.concat(validate114.errors);
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
  validate381.errors = vErrors;
  return errors === 0;
}
function validate380(
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
        !validate381(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate381.errors
            : vErrors.concat(validate381.errors);
        errors = vErrors.length;
      }
    }
  }
  validate380.errors = vErrors;
  return errors === 0;
}
const schema107 = {
  type: 'array',
  items: {
    $ref: 'mrnbhFz9mcnuoClk8qaUnSXegS5u8BBEfSZfPsmR2Rg',
  },
  nullable: true,
};
const schema108 = {
  type: 'object',
  properties: {
    container: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imageID: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    running: {
      $ref: 'wfQZUPW6Ph9KzmFftj2V8NJK6yXUuawD9CqOt1rGUI',
    },
    terminated: {
      $ref: 'hGozPa9Yi27patVkwuiQHlMIXjL1nyGcNUxnSnubrc',
    },
    waiting: {
      $ref: 'lg9IF1VSHnPvDGbIW3n8dV1bpr1s7gp7sBns4zd8xA',
    },
  },
};
const schema52 = {
  type: 'object',
  properties: {
    startedAt: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
  },
  nullable: true,
};
function validate157(
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
    if (data.startedAt !== undefined) {
      if (
        !validate113(data.startedAt, {
          instancePath: instancePath + '/startedAt',
          parentData: data,
          parentDataProperty: 'startedAt',
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
  validate157.errors = vErrors;
  return errors === 0;
}
const schema53 = {
  type: 'object',
  required: ['exitCode'],
  properties: {
    containerID: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    exitCode: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    finishedAt: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
    message: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    reason: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    signal: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    startedAt: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
  },
  nullable: true,
};
function validate159(
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
    if (data.exitCode === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'exitCode',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.containerID !== undefined) {
      if (
        !validate28(data.containerID, {
          instancePath: instancePath + '/containerID',
          parentData: data,
          parentDataProperty: 'containerID',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.exitCode !== undefined) {
      if (
        !validate112(data.exitCode, {
          instancePath: instancePath + '/exitCode',
          parentData: data,
          parentDataProperty: 'exitCode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate112.errors
            : vErrors.concat(validate112.errors);
        errors = vErrors.length;
      }
    }
    if (data.finishedAt !== undefined) {
      if (
        !validate113(data.finishedAt, {
          instancePath: instancePath + '/finishedAt',
          parentData: data,
          parentDataProperty: 'finishedAt',
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
    if (data.message !== undefined) {
      if (
        !validate28(data.message, {
          instancePath: instancePath + '/message',
          parentData: data,
          parentDataProperty: 'message',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== undefined) {
      if (
        !validate28(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.signal !== undefined) {
      if (
        !validate84(data.signal, {
          instancePath: instancePath + '/signal',
          parentData: data,
          parentDataProperty: 'signal',
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
    if (data.startedAt !== undefined) {
      if (
        !validate113(data.startedAt, {
          instancePath: instancePath + '/startedAt',
          parentData: data,
          parentDataProperty: 'startedAt',
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
  validate159.errors = vErrors;
  return errors === 0;
}
const schema54 = {
  type: 'object',
  properties: {
    message: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    reason: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate167(
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
    if (data.message !== undefined) {
      if (
        !validate28(data.message, {
          instancePath: instancePath + '/message',
          parentData: data,
          parentDataProperty: 'message',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== undefined) {
      if (
        !validate28(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
  }
  validate167.errors = vErrors;
  return errors === 0;
}
function validate390(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.container !== undefined) {
      if (
        !validate28(data.container, {
          instancePath: instancePath + '/container',
          parentData: data,
          parentDataProperty: 'container',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.imageID !== undefined) {
      if (
        !validate28(data.imageID, {
          instancePath: instancePath + '/imageID',
          parentData: data,
          parentDataProperty: 'imageID',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.running !== undefined) {
      if (
        !validate157(data.running, {
          instancePath: instancePath + '/running',
          parentData: data,
          parentDataProperty: 'running',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate157.errors
            : vErrors.concat(validate157.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminated !== undefined) {
      if (
        !validate159(data.terminated, {
          instancePath: instancePath + '/terminated',
          parentData: data,
          parentDataProperty: 'terminated',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate159.errors
            : vErrors.concat(validate159.errors);
        errors = vErrors.length;
      }
    }
    if (data.waiting !== undefined) {
      if (
        !validate167(data.waiting, {
          instancePath: instancePath + '/waiting',
          parentData: data,
          parentDataProperty: 'waiting',
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
  validate390.errors = vErrors;
  return errors === 0;
}
function validate389(
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
        !validate390(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate390.errors
            : vErrors.concat(validate390.errors);
        errors = vErrors.length;
      }
    }
  }
  validate389.errors = vErrors;
  return errors === 0;
}
const schema109 = {
  type: 'array',
  items: {
    $ref: 'DnfGHinLvYIIUfYcsw0MlBbOXpbLgMAx3GGpRbZ35ww',
  },
  nullable: true,
};
const schema110 = {
  type: 'object',
  properties: {
    container: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imageID: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    inputs: {
      $ref: 'jZCFAvbprmP8nVHeMZCMWbfGySjd5D4rei05UAFQDlo',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    outputs: {
      $ref: 'jZCFAvbprmP8nVHeMZCMWbfGySjd5D4rei05UAFQDlo',
    },
    provenance: {
      $ref: 'pX87U6IISrjcFHVSDxKohY7s4qONdhwgOGrg1kUA',
    },
    results: {
      $ref: 'LgAFLyqYQzBTuzhZMRq8N81uDZDX1YRxwqwfG6adGk',
    },
    running: {
      $ref: 'wfQZUPW6Ph9KzmFftj2V8NJK6yXUuawD9CqOt1rGUI',
    },
    terminated: {
      $ref: 'hGozPa9Yi27patVkwuiQHlMIXjL1nyGcNUxnSnubrc',
    },
    waiting: {
      $ref: 'lg9IF1VSHnPvDGbIW3n8dV1bpr1s7gp7sBns4zd8xA',
    },
  },
};
const schema46 = {
  type: 'array',
  items: {
    $ref: 'GOb5l0Z8heqGHydJJfOshR1ztKvgS0i97rGz6rUYGI',
  },
  nullable: true,
};
const schema47 = {
  type: 'object',
  properties: {
    buildOutput: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    values: {
      $ref: '0Lmq1eNaaWCbcZC2WDS9URFkhkAPFCLu5lf1eOkDoH0',
    },
  },
};
const schema48 = {
  type: 'array',
  items: {
    $ref: 'U4mk8XXnblCHtI2ii97r7lqBr6ObsRGrvYQwgDlM6o',
  },
  nullable: true,
};
const schema49 = {
  type: 'object',
  properties: {
    digest: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    uri: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
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
    if (data.digest !== undefined) {
      if (
        !validate38(data.digest, {
          instancePath: instancePath + '/digest',
          parentData: data,
          parentDataProperty: 'digest',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
    if (data.uri !== undefined) {
      if (
        !validate28(data.uri, {
          instancePath: instancePath + '/uri',
          parentData: data,
          parentDataProperty: 'uri',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
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
function validate120(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.buildOutput !== undefined) {
      if (
        !validate32(data.buildOutput, {
          instancePath: instancePath + '/buildOutput',
          parentData: data,
          parentDataProperty: 'buildOutput',
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
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.values !== undefined) {
      if (
        !validate123(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate120.errors = vErrors;
  return errors === 0;
}
function validate119(
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
        !validate120(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate119.errors = vErrors;
  return errors === 0;
}
const schema55 = {
  type: 'array',
  items: {
    $ref: '0HlkbqY6lHbULKs9yYnfDcE3vv0eGo3M4t8JlJbKHF0',
  },
  nullable: true,
};
const schema56 = {
  type: 'object',
  required: ['name', 'value'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    value: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
};
function validate171(
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
    if (data.type !== undefined) {
      if (
        !validate28(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== undefined) {
      if (
        !validate29(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate171.errors = vErrors;
  return errors === 0;
}
function validate170(
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
        !validate171(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate170.errors = vErrors;
  return errors === 0;
}
function validate402(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.container !== undefined) {
      if (
        !validate28(data.container, {
          instancePath: instancePath + '/container',
          parentData: data,
          parentDataProperty: 'container',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.imageID !== undefined) {
      if (
        !validate28(data.imageID, {
          instancePath: instancePath + '/imageID',
          parentData: data,
          parentDataProperty: 'imageID',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.inputs !== undefined) {
      if (
        !validate119(data.inputs, {
          instancePath: instancePath + '/inputs',
          parentData: data,
          parentDataProperty: 'inputs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate119.errors
            : vErrors.concat(validate119.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate28(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate28.errors
            : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.outputs !== undefined) {
      if (
        !validate119(data.outputs, {
          instancePath: instancePath + '/outputs',
          parentData: data,
          parentDataProperty: 'outputs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate119.errors
            : vErrors.concat(validate119.errors);
        errors = vErrors.length;
      }
    }
    if (data.provenance !== undefined) {
      if (
        !validate130(data.provenance, {
          instancePath: instancePath + '/provenance',
          parentData: data,
          parentDataProperty: 'provenance',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate130.errors
            : vErrors.concat(validate130.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate170(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate170.errors
            : vErrors.concat(validate170.errors);
        errors = vErrors.length;
      }
    }
    if (data.running !== undefined) {
      if (
        !validate157(data.running, {
          instancePath: instancePath + '/running',
          parentData: data,
          parentDataProperty: 'running',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate157.errors
            : vErrors.concat(validate157.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminated !== undefined) {
      if (
        !validate159(data.terminated, {
          instancePath: instancePath + '/terminated',
          parentData: data,
          parentDataProperty: 'terminated',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate159.errors
            : vErrors.concat(validate159.errors);
        errors = vErrors.length;
      }
    }
    if (data.waiting !== undefined) {
      if (
        !validate167(data.waiting, {
          instancePath: instancePath + '/waiting',
          parentData: data,
          parentDataProperty: 'waiting',
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
  validate402.errors = vErrors;
  return errors === 0;
}
function validate401(
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
        !validate402(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate402.errors
            : vErrors.concat(validate402.errors);
        errors = vErrors.length;
      }
    }
  }
  validate401.errors = vErrors;
  return errors === 0;
}
function validate353(
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
    if (data.podName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'podName',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.annotations !== undefined) {
      if (
        !validate38(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
    if (data.cloudEvents !== undefined) {
      if (
        !validate355(data.cloudEvents, {
          instancePath: instancePath + '/cloudEvents',
          parentData: data,
          parentDataProperty: 'cloudEvents',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate355.errors
            : vErrors.concat(validate355.errors);
        errors = vErrors.length;
      }
    }
    if (data.completionTime !== undefined) {
      if (
        !validate113(data.completionTime, {
          instancePath: instancePath + '/completionTime',
          parentData: data,
          parentDataProperty: 'completionTime',
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
    if (data.conditions !== undefined) {
      if (
        !validate367(data.conditions, {
          instancePath: instancePath + '/conditions',
          parentData: data,
          parentDataProperty: 'conditions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate367.errors
            : vErrors.concat(validate367.errors);
        errors = vErrors.length;
      }
    }
    if (data.observedGeneration !== undefined) {
      if (
        !validate111(data.observedGeneration, {
          instancePath: instancePath + '/observedGeneration',
          parentData: data,
          parentDataProperty: 'observedGeneration',
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
    if (data.podName !== undefined) {
      if (
        !validate21(data.podName, {
          instancePath: instancePath + '/podName',
          parentData: data,
          parentDataProperty: 'podName',
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
    if (data.provenance !== undefined) {
      if (
        !validate130(data.provenance, {
          instancePath: instancePath + '/provenance',
          parentData: data,
          parentDataProperty: 'provenance',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate130.errors
            : vErrors.concat(validate130.errors);
        errors = vErrors.length;
      }
    }
    if (data.resourcesResult !== undefined) {
      if (
        !validate380(data.resourcesResult, {
          instancePath: instancePath + '/resourcesResult',
          parentData: data,
          parentDataProperty: 'resourcesResult',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate380.errors
            : vErrors.concat(validate380.errors);
        errors = vErrors.length;
      }
    }
    if (data.retriesStatus !== undefined) {
      if (
        !validate29(data.retriesStatus, {
          instancePath: instancePath + '/retriesStatus',
          parentData: data,
          parentDataProperty: 'retriesStatus',
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
    if (data.sidecars !== undefined) {
      if (
        !validate389(data.sidecars, {
          instancePath: instancePath + '/sidecars',
          parentData: data,
          parentDataProperty: 'sidecars',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate389.errors
            : vErrors.concat(validate389.errors);
        errors = vErrors.length;
      }
    }
    if (data.spanContext !== undefined) {
      if (
        !validate38(data.spanContext, {
          instancePath: instancePath + '/spanContext',
          parentData: data,
          parentDataProperty: 'spanContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate38.errors
            : vErrors.concat(validate38.errors);
        errors = vErrors.length;
      }
    }
    if (data.startTime !== undefined) {
      if (
        !validate113(data.startTime, {
          instancePath: instancePath + '/startTime',
          parentData: data,
          parentDataProperty: 'startTime',
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
    if (data.steps !== undefined) {
      if (
        !validate401(data.steps, {
          instancePath: instancePath + '/steps',
          parentData: data,
          parentDataProperty: 'steps',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate401.errors
            : vErrors.concat(validate401.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskResults !== undefined) {
      if (
        !validate170(data.taskResults, {
          instancePath: instancePath + '/taskResults',
          parentData: data,
          parentDataProperty: 'taskResults',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate170.errors
            : vErrors.concat(validate170.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskSpec !== undefined) {
      if (
        !validate29(data.taskSpec, {
          instancePath: instancePath + '/taskSpec',
          parentData: data,
          parentDataProperty: 'taskSpec',
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
  validate353.errors = vErrors;
  return errors === 0;
}
function validate176(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1beta1.TaskRun" */
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
        !validate177(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate177.errors
            : vErrors.concat(validate177.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate179(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate179.errors
            : vErrors.concat(validate179.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate181(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate185(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate185.errors
            : vErrors.concat(validate185.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (
        !validate353(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate353.errors
            : vErrors.concat(validate353.errors);
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
  validate176.errors = vErrors;
  return errors === 0;
}
