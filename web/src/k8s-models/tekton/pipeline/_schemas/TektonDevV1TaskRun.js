import { formats } from '@kubernetes-models/validate';
export const validate = validate270;
const schema81 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'wgZDK9uwuXoeAzLqnWqrq0y9h754fMvBk39QXQsdw',
    },
    kind: {
      $ref: 'luvmBdxKgNRJAhjCfZBRstbb2hj9XqYLp3ocvGvH0A',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'nqovRaImzzjheZlnNQSGIGUE2ho1EHaIcSdiQyLHqY',
    },
    status: {
      $ref: 'pGXBbB9OWmOZtMWQ6yzvEXVW5pftznyhrl7vnHteIkM',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1.TaskRun',
};
const schema82 = {
  type: 'string',
  enum: ['tekton.dev/v1'],
};
function validate271(
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
        allowedValues: schema82.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate271.errors = vErrors;
  return errors === 0;
}
const schema83 = {
  type: 'string',
  enum: ['TaskRun'],
};
function validate273(
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
        allowedValues: schema83.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate273.errors = vErrors;
  return errors === 0;
}
const schema84 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema85 = {};

import { validate as validate276 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate275(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate276(data, {
        instancePath,
        parentData,
        parentDataProperty,
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
  validate275.errors = vErrors;
  return errors === 0;
}
const schema86 = {
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
    retries: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sidecarSpecs: {
      $ref: 'rKfPrjjPooH5LSSRs6JyPIJc7AHV3axCfmtPcTwE8I',
    },
    status: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    statusMessage: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    stepSpecs: {
      $ref: 'rKfPrjjPooH5LSSRs6JyPIJc7AHV3axCfmtPcTwE8I',
    },
    taskRef: {
      $ref: 'B9Wl9WkHCEUGwvp2g0cMfwlB7OcdXxnOkXtj6ZyFg',
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
const schema51 = {
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
const schema17 = {
  type: 'array',
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  nullable: true,
};
const schema18 = {
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
function validate41(
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
function validate154(
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
        !validate40(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
  validate154.errors = vErrors;
  return errors === 0;
}
const schema87 = {
  type: 'object',
  properties: {
    breakpoints: {
      $ref: 'egP7djp77mqG4q9UePqwq0NAJW6Ne632Kd1O6fHxLs',
    },
  },
  nullable: true,
};
const schema88 = {
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
function validate282(
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
  validate282.errors = vErrors;
  return errors === 0;
}
function validate281(
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
        !validate282(data.breakpoints, {
          instancePath: instancePath + '/breakpoints',
          parentData: data,
          parentDataProperty: 'breakpoints',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate282.errors
            : vErrors.concat(validate282.errors);
        errors = vErrors.length;
      }
    }
  }
  validate281.errors = vErrors;
  return errors === 0;
}
const schema22 = {
  type: 'array',
  items: {
    $ref: '9Io3ghMpg6A5V9ui8mWOQtmsEyRmTdvNEMe6HPIU',
  },
  nullable: true,
};
const schema23 = {
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
function validate55(
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
  validate55.errors = vErrors;
  return errors === 0;
}
function validate54(
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
        !validate55(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate54.errors = vErrors;
  return errors === 0;
}
const schema89 = {
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
const schema90 = {
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
const schema91 = {
  type: 'array',
  items: {
    $ref: 'sWfncG59c1XfNxmkMXW89j5rdj0YnP54Zpfo5QkH10',
  },
  nullable: true,
};
const schema92 = {
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
function validate294(
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
  validate294.errors = vErrors;
  return errors === 0;
}
function validate293(
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
        !validate294(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate294.errors
            : vErrors.concat(validate294.errors);
        errors = vErrors.length;
      }
    }
  }
  validate293.errors = vErrors;
  return errors === 0;
}
function validate291(
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
        !validate293(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
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
  validate291.errors = vErrors;
  return errors === 0;
}
const schema52 = {
  type: 'array',
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  nullable: true,
};
const schema53 = {
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
const schema54 = {
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
const schema30 = {
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
function validate75(
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
  validate75.errors = vErrors;
  return errors === 0;
}
const schema31 = {
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
  validate78.errors = vErrors;
  return errors === 0;
}
function validate162(
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
        !validate75(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate78(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
  validate162.errors = vErrors;
  return errors === 0;
}
function validate159(
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
        !validate162(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate162.errors
            : vErrors.concat(validate162.errors);
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
  validate159.errors = vErrors;
  return errors === 0;
}
function validate158(
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
        !validate159(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate158.errors = vErrors;
  return errors === 0;
}
const schema93 = {
  type: 'array',
  items: {
    $ref: 'IX3OlwxoKRMSjhCltCPJOVjPaBEO4EyMsvYuOuXjxQg',
  },
  nullable: true,
};
const schema94 = {
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
function validate305(
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
  validate305.errors = vErrors;
  return errors === 0;
}
function validate304(
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
        !validate305(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate305.errors
            : vErrors.concat(validate305.errors);
        errors = vErrors.length;
      }
    }
  }
  validate304.errors = vErrors;
  return errors === 0;
}
const schema95 = {
  type: 'array',
  items: {
    $ref: 'lX4IaYIZZv1DIKZ67DpEDlNr31ePF1qx2EUDHqZRM4',
  },
  nullable: true,
};
const schema96 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
};
function validate312(
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
  validate312.errors = vErrors;
  return errors === 0;
}
function validate311(
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
        !validate312(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate312.errors
            : vErrors.concat(validate312.errors);
        errors = vErrors.length;
      }
    }
  }
  validate311.errors = vErrors;
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
const schema97 = {
  type: 'array',
  items: {
    $ref: 'Me3dAzCevo9JgluOcBf4PX5XcjXOHICBlAsWQglc',
  },
  nullable: true,
};
const schema98 = {
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
const schema33 = {
  type: 'integer',
  format: 'int64',
  nullable: true,
};
const formats2 = formats.int64;
function validate86(
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
  validate86.errors = vErrors;
  return errors === 0;
}
function validate322(
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
        !validate86(data.tolerationSeconds, {
          instancePath: instancePath + '/tolerationSeconds',
          parentData: data,
          parentDataProperty: 'tolerationSeconds',
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
  validate322.errors = vErrors;
  return errors === 0;
}
function validate321(
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
        !validate322(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate322.errors
            : vErrors.concat(validate322.errors);
        errors = vErrors.length;
      }
    }
  }
  validate321.errors = vErrors;
  return errors === 0;
}
const schema99 = {
  type: 'array',
  items: {
    $ref: 'PMEoIw3F1IPZaI9o7ckqeodb7BJ6q7Y2F6PDUm9sk',
  },
  nullable: true,
};
const schema100 = {
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
const schema25 = {
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
const schema26 = {
  type: 'array',
  items: {
    $ref: 'MkwwSDeYoT1APit7w8qsvbKCw8OynjINdeojyPgpPQ',
  },
  nullable: true,
};
const schema27 = {
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
function validate62(
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
  validate62.errors = vErrors;
  return errors === 0;
}
function validate61(
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
        !validate62(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate61.errors = vErrors;
  return errors === 0;
}
function validate60(
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
        !validate61(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
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
  validate60.errors = vErrors;
  return errors === 0;
}
const schema40 = {
  type: 'integer',
  format: 'int32',
};
const formats0 = formats.int32;
function validate100(
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
  validate100.errors = vErrors;
  return errors === 0;
}
const schema24 = {
  type: 'integer',
  format: 'int32',
  nullable: true,
};
function validate59(
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
  validate59.errors = vErrors;
  return errors === 0;
}
function validate331(
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
        !validate60(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate60.errors
            : vErrors.concat(validate60.errors);
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
        !validate100(data.maxSkew, {
          instancePath: instancePath + '/maxSkew',
          parentData: data,
          parentDataProperty: 'maxSkew',
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
    if (data.minDomains !== undefined) {
      if (
        !validate59(data.minDomains, {
          instancePath: instancePath + '/minDomains',
          parentData: data,
          parentDataProperty: 'minDomains',
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
  validate331.errors = vErrors;
  return errors === 0;
}
function validate330(
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
        !validate331(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate331.errors
            : vErrors.concat(validate331.errors);
        errors = vErrors.length;
      }
    }
  }
  validate330.errors = vErrors;
  return errors === 0;
}
function validate288(
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
        !validate291(data.dnsConfig, {
          instancePath: instancePath + '/dnsConfig',
          parentData: data,
          parentDataProperty: 'dnsConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate291.errors
            : vErrors.concat(validate291.errors);
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
        !validate158(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate158.errors
            : vErrors.concat(validate158.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostAliases !== undefined) {
      if (
        !validate304(data.hostAliases, {
          instancePath: instancePath + '/hostAliases',
          parentData: data,
          parentDataProperty: 'hostAliases',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate304.errors
            : vErrors.concat(validate304.errors);
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
        !validate311(data.imagePullSecrets, {
          instancePath: instancePath + '/imagePullSecrets',
          parentData: data,
          parentDataProperty: 'imagePullSecrets',
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
        !validate321(data.tolerations, {
          instancePath: instancePath + '/tolerations',
          parentData: data,
          parentDataProperty: 'tolerations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate321.errors
            : vErrors.concat(validate321.errors);
        errors = vErrors.length;
      }
    }
    if (data.topologySpreadConstraints !== undefined) {
      if (
        !validate330(data.topologySpreadConstraints, {
          instancePath: instancePath + '/topologySpreadConstraints',
          parentData: data,
          parentDataProperty: 'topologySpreadConstraints',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate330.errors
            : vErrors.concat(validate330.errors);
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
  validate288.errors = vErrors;
  return errors === 0;
}
const schema38 = {
  type: 'integer',
  nullable: true,
};
function validate98(
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
  validate98.errors = vErrors;
  return errors === 0;
}
const schema19 = {
  type: 'array',
  items: {
    $ref: 'p2cKjcB6Zc76erfDnpdOYL6kJh1Cp5rwrbb30a6ag',
  },
  nullable: true,
};
const schema20 = {
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
const schema21 = {
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
function validate47(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.claims !== undefined) {
      if (
        !validate40(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
  validate47.errors = vErrors;
  return errors === 0;
}
function validate46(
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
        !validate47(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate47.errors
            : vErrors.concat(validate47.errors);
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
const schema101 = {
  type: 'object',
  properties: {
    apiVersion: {
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
function validate350(
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
        !validate54(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate54.errors
            : vErrors.concat(validate54.errors);
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
  validate350.errors = vErrors;
  return errors === 0;
}
const schema102 = {
  type: 'array',
  items: {
    $ref: 'pbI2wQ0FVF5d8RbWov7wdwRzVG8Hm8lGG7TXQrZzUI',
  },
  nullable: true,
};
const schema103 = {
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
const schema104 = {
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
const schema28 = {
  type: 'array',
  items: {
    $ref: 'KZm4JRWtb68G65niEVa35cCfAyEYRWGkoaumd8EY',
  },
  nullable: true,
};
const schema29 = {
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
function validate70(
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
        !validate59(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
  validate70.errors = vErrors;
  return errors === 0;
}
function validate69(
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
        !validate70(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate69.errors = vErrors;
  return errors === 0;
}
function validate361(
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
        !validate59(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate69(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate69.errors
            : vErrors.concat(validate69.errors);
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
  validate361.errors = vErrors;
  return errors === 0;
}
const schema105 = {
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
const schema106 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  nullable: true,
};
function validate370(
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
  validate370.errors = vErrors;
  return errors === 0;
}
function validate367(
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
        !validate370(data.nodePublishSecretRef, {
          instancePath: instancePath + '/nodePublishSecretRef',
          parentData: data,
          parentDataProperty: 'nodePublishSecretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate370.errors
            : vErrors.concat(validate370.errors);
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
  validate367.errors = vErrors;
  return errors === 0;
}
const schema107 = {
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
function validate376(
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
  validate376.errors = vErrors;
  return errors === 0;
}
const schema108 = {
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
function validate381(
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
  validate381.errors = vErrors;
  return errors === 0;
}
const schema109 = {
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
const schema110 = {
  type: 'array',
  items: {
    $ref: 'WICQ5kdq9kT3ygPK1xgAXHZR3qlzTXRJaybZiIbakk',
  },
  nullable: true,
};
const schema111 = {
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
const schema112 = {
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
function validate389(
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
        !validate60(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate60.errors
            : vErrors.concat(validate60.errors);
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
  validate389.errors = vErrors;
  return errors === 0;
}
const schema32 = {
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
function validate82(
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
        !validate69(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate69.errors
            : vErrors.concat(validate69.errors);
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
  validate82.errors = vErrors;
  return errors === 0;
}
const schema113 = {
  type: 'object',
  properties: {
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  nullable: true,
};
const schema114 = {
  type: 'array',
  items: {
    $ref: '83t6EKcTjvzxVMR8ob3sMZu0lIqxm1azYctskfY5Ks4',
  },
  nullable: true,
};
const schema115 = {
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
function validate399(
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
        !validate75(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.mode !== undefined) {
      if (
        !validate59(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
        !validate78(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
  validate399.errors = vErrors;
  return errors === 0;
}
function validate398(
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
        !validate399(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate399.errors
            : vErrors.concat(validate399.errors);
        errors = vErrors.length;
      }
    }
  }
  validate398.errors = vErrors;
  return errors === 0;
}
function validate397(
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
        !validate398(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate398.errors
            : vErrors.concat(validate398.errors);
        errors = vErrors.length;
      }
    }
  }
  validate397.errors = vErrors;
  return errors === 0;
}
const schema116 = {
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
function validate408(
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
        !validate86(data.expirationSeconds, {
          instancePath: instancePath + '/expirationSeconds',
          parentData: data,
          parentDataProperty: 'expirationSeconds',
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
  validate408.errors = vErrors;
  return errors === 0;
}
function validate388(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.clusterTrustBundle !== undefined) {
      if (
        !validate389(data.clusterTrustBundle, {
          instancePath: instancePath + '/clusterTrustBundle',
          parentData: data,
          parentDataProperty: 'clusterTrustBundle',
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
    if (data.configMap !== undefined) {
      if (
        !validate82(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate82.errors
            : vErrors.concat(validate82.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate397(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate397.errors
            : vErrors.concat(validate397.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate82(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate82.errors
            : vErrors.concat(validate82.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountToken !== undefined) {
      if (
        !validate408(data.serviceAccountToken, {
          instancePath: instancePath + '/serviceAccountToken',
          parentData: data,
          parentDataProperty: 'serviceAccountToken',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate408.errors
            : vErrors.concat(validate408.errors);
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
  validate388.errors = vErrors;
  return errors === 0;
}
function validate387(
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
        !validate388(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate388.errors
            : vErrors.concat(validate388.errors);
        errors = vErrors.length;
      }
    }
  }
  validate387.errors = vErrors;
  return errors === 0;
}
function validate385(
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
        !validate59(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.sources !== undefined) {
      if (
        !validate387(data.sources, {
          instancePath: instancePath + '/sources',
          parentData: data,
          parentDataProperty: 'sources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate387.errors
            : vErrors.concat(validate387.errors);
        errors = vErrors.length;
      }
    }
  }
  validate385.errors = vErrors;
  return errors === 0;
}
const schema117 = {
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
function validate416(
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
        !validate59(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate69(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate69.errors
            : vErrors.concat(validate69.errors);
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
  validate416.errors = vErrors;
  return errors === 0;
}
function validate360(
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
        !validate361(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate361.errors
            : vErrors.concat(validate361.errors);
        errors = vErrors.length;
      }
    }
    if (data.csi !== undefined) {
      if (
        !validate367(data.csi, {
          instancePath: instancePath + '/csi',
          parentData: data,
          parentDataProperty: 'csi',
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
    if (data.emptyDir !== undefined) {
      if (
        !validate376(data.emptyDir, {
          instancePath: instancePath + '/emptyDir',
          parentData: data,
          parentDataProperty: 'emptyDir',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate376.errors
            : vErrors.concat(validate376.errors);
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
        !validate381(data.persistentVolumeClaim, {
          instancePath: instancePath + '/persistentVolumeClaim',
          parentData: data,
          parentDataProperty: 'persistentVolumeClaim',
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
    if (data.projected !== undefined) {
      if (
        !validate385(data.projected, {
          instancePath: instancePath + '/projected',
          parentData: data,
          parentDataProperty: 'projected',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate385.errors
            : vErrors.concat(validate385.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate416(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate416.errors
            : vErrors.concat(validate416.errors);
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
  validate360.errors = vErrors;
  return errors === 0;
}
function validate359(
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
        !validate360(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate360.errors
            : vErrors.concat(validate360.errors);
        errors = vErrors.length;
      }
    }
  }
  validate359.errors = vErrors;
  return errors === 0;
}
function validate279(
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
        !validate154(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.debug !== undefined) {
      if (
        !validate281(data.debug, {
          instancePath: instancePath + '/debug',
          parentData: data,
          parentDataProperty: 'debug',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate281.errors
            : vErrors.concat(validate281.errors);
        errors = vErrors.length;
      }
    }
    if (data.params !== undefined) {
      if (
        !validate54(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate54.errors
            : vErrors.concat(validate54.errors);
        errors = vErrors.length;
      }
    }
    if (data.podTemplate !== undefined) {
      if (
        !validate288(data.podTemplate, {
          instancePath: instancePath + '/podTemplate',
          parentData: data,
          parentDataProperty: 'podTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate288.errors
            : vErrors.concat(validate288.errors);
        errors = vErrors.length;
      }
    }
    if (data.retries !== undefined) {
      if (
        !validate98(data.retries, {
          instancePath: instancePath + '/retries',
          parentData: data,
          parentDataProperty: 'retries',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate98.errors
            : vErrors.concat(validate98.errors);
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
    if (data.sidecarSpecs !== undefined) {
      if (
        !validate45(data.sidecarSpecs, {
          instancePath: instancePath + '/sidecarSpecs',
          parentData: data,
          parentDataProperty: 'sidecarSpecs',
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
    if (data.stepSpecs !== undefined) {
      if (
        !validate45(data.stepSpecs, {
          instancePath: instancePath + '/stepSpecs',
          parentData: data,
          parentDataProperty: 'stepSpecs',
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
    if (data.taskRef !== undefined) {
      if (
        !validate350(data.taskRef, {
          instancePath: instancePath + '/taskRef',
          parentData: data,
          parentDataProperty: 'taskRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate350.errors
            : vErrors.concat(validate350.errors);
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
        !validate359(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate359.errors
            : vErrors.concat(validate359.errors);
        errors = vErrors.length;
      }
    }
  }
  validate279.errors = vErrors;
  return errors === 0;
}
const schema118 = {
  type: 'object',
  required: ['podName'],
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    artifacts: {
      $ref: 'iAkNJfdR27zd9auaDJBqsM2ERy0UmLFw823Uu4vcA',
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
      $ref: '69mOpxlt0aD4vMopIeK0zOQ2HQ1bNRej6amKUwmAwsY',
    },
    results: {
      $ref: 'LgAFLyqYQzBTuzhZMRq8N81uDZDX1YRxwqwfG6adGk',
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
      $ref: 'kR0GvvP89FU3YgwFLIJuRc9hMf1stLdnTyFGFVWrAs',
    },
    taskSpec: {
      $ref: 'WW8fZeWFbLBQYVybHx3amtn5HUGX9owZqOEduBel35w',
    },
  },
  nullable: true,
};
const schema119 = {
  type: 'object',
  properties: {
    inputs: {
      $ref: 'jZCFAvbprmP8nVHeMZCMWbfGySjd5D4rei05UAFQDlo',
    },
    outputs: {
      $ref: 'jZCFAvbprmP8nVHeMZCMWbfGySjd5D4rei05UAFQDlo',
    },
  },
  nullable: true,
};
const schema34 = {
  type: 'array',
  items: {
    $ref: 'GOb5l0Z8heqGHydJJfOshR1ztKvgS0i97rGz6rUYGI',
  },
  nullable: true,
};
const schema35 = {
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
const schema36 = {
  type: 'array',
  items: {
    $ref: 'U4mk8XXnblCHtI2ii97r7lqBr6ObsRGrvYQwgDlM6o',
  },
  nullable: true,
};
const schema37 = {
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
function validate92(
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
  validate92.errors = vErrors;
  return errors === 0;
}
function validate91(
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
        !validate92(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate92.errors
            : vErrors.concat(validate92.errors);
        errors = vErrors.length;
      }
    }
  }
  validate91.errors = vErrors;
  return errors === 0;
}
function validate88(
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
        !validate91(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate91.errors
            : vErrors.concat(validate91.errors);
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
  validate88.errors = vErrors;
  return errors === 0;
}
function validate87(
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
        !validate88(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate88.errors
            : vErrors.concat(validate88.errors);
        errors = vErrors.length;
      }
    }
  }
  validate87.errors = vErrors;
  return errors === 0;
}
function validate429(
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
        !validate87(data.inputs, {
          instancePath: instancePath + '/inputs',
          parentData: data,
          parentDataProperty: 'inputs',
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
    if (data.outputs !== undefined) {
      if (
        !validate87(data.outputs, {
          instancePath: instancePath + '/outputs',
          parentData: data,
          parentDataProperty: 'outputs',
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
  validate429.errors = vErrors;
  return errors === 0;
}
const schema39 = {
  type: 'string',
  format: 'date-time',
  nullable: true,
};
const formats4 = formats['date-time'];
function validate99(
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
    if (!formats4.validate(data)) {
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
  validate99.errors = vErrors;
  return errors === 0;
}
const schema120 = {
  type: 'array',
  items: {
    $ref: 'wbr2E4NheEu4hYPlq9gH96fDqOeJ0hkPnqS5qesgw',
  },
  nullable: true,
};
const schema121 = {
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
function validate435(
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
  validate435.errors = vErrors;
  return errors === 0;
}
function validate434(
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
        !validate435(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate435.errors
            : vErrors.concat(validate435.errors);
        errors = vErrors.length;
      }
    }
  }
  validate434.errors = vErrors;
  return errors === 0;
}
const schema41 = {
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
const schema42 = {
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
function validate102(
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
        !validate98(data.maxResultSize, {
          instancePath: instancePath + '/maxResultSize',
          parentData: data,
          parentDataProperty: 'maxResultSize',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate98.errors
            : vErrors.concat(validate98.errors);
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
  validate102.errors = vErrors;
  return errors === 0;
}
const schema43 = {
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
function validate126(
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
  validate126.errors = vErrors;
  return errors === 0;
}
function validate101(
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
        !validate102(data.featureFlags, {
          instancePath: instancePath + '/featureFlags',
          parentData: data,
          parentDataProperty: 'featureFlags',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate102.errors
            : vErrors.concat(validate102.errors);
        errors = vErrors.length;
      }
    }
    if (data.refSource !== undefined) {
      if (
        !validate126(data.refSource, {
          instancePath: instancePath + '/refSource',
          parentData: data,
          parentDataProperty: 'refSource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate126.errors
            : vErrors.concat(validate126.errors);
        errors = vErrors.length;
      }
    }
  }
  validate101.errors = vErrors;
  return errors === 0;
}
const schema44 = {
  type: 'array',
  items: {
    $ref: '0HlkbqY6lHbULKs9yYnfDcE3vv0eGo3M4t8JlJbKHF0',
  },
  nullable: true,
};
const schema45 = {
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
function validate132(
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
  validate132.errors = vErrors;
  return errors === 0;
}
function validate131(
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
        !validate132(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate131.errors = vErrors;
  return errors === 0;
}
const schema122 = {
  type: 'array',
  items: {
    $ref: 'mrnbhFz9mcnuoClk8qaUnSXegS5u8BBEfSZfPsmR2Rg',
  },
  nullable: true,
};
const schema123 = {
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
const schema46 = {
  type: 'object',
  properties: {
    startedAt: {
      $ref: 'thZzwpySeU7LsVtTYjwqN1mWUAwFAnezim8OMie8k',
    },
  },
  nullable: true,
};
function validate137(
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
        !validate99(data.startedAt, {
          instancePath: instancePath + '/startedAt',
          parentData: data,
          parentDataProperty: 'startedAt',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate99.errors
            : vErrors.concat(validate99.errors);
        errors = vErrors.length;
      }
    }
  }
  validate137.errors = vErrors;
  return errors === 0;
}
const schema47 = {
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
function validate139(
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
        !validate100(data.exitCode, {
          instancePath: instancePath + '/exitCode',
          parentData: data,
          parentDataProperty: 'exitCode',
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
    if (data.finishedAt !== undefined) {
      if (
        !validate99(data.finishedAt, {
          instancePath: instancePath + '/finishedAt',
          parentData: data,
          parentDataProperty: 'finishedAt',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate99.errors
            : vErrors.concat(validate99.errors);
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
        !validate59(data.signal, {
          instancePath: instancePath + '/signal',
          parentData: data,
          parentDataProperty: 'signal',
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
    if (data.startedAt !== undefined) {
      if (
        !validate99(data.startedAt, {
          instancePath: instancePath + '/startedAt',
          parentData: data,
          parentDataProperty: 'startedAt',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate99.errors
            : vErrors.concat(validate99.errors);
        errors = vErrors.length;
      }
    }
  }
  validate139.errors = vErrors;
  return errors === 0;
}
const schema48 = {
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
function validate147(
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
  validate147.errors = vErrors;
  return errors === 0;
}
function validate450(
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
        !validate137(data.running, {
          instancePath: instancePath + '/running',
          parentData: data,
          parentDataProperty: 'running',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate137.errors
            : vErrors.concat(validate137.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminated !== undefined) {
      if (
        !validate139(data.terminated, {
          instancePath: instancePath + '/terminated',
          parentData: data,
          parentDataProperty: 'terminated',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate139.errors
            : vErrors.concat(validate139.errors);
        errors = vErrors.length;
      }
    }
    if (data.waiting !== undefined) {
      if (
        !validate147(data.waiting, {
          instancePath: instancePath + '/waiting',
          parentData: data,
          parentDataProperty: 'waiting',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate147.errors
            : vErrors.concat(validate147.errors);
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
  validate450.errors = vErrors;
  return errors === 0;
}
function validate449(
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
        !validate450(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate450.errors
            : vErrors.concat(validate450.errors);
        errors = vErrors.length;
      }
    }
  }
  validate449.errors = vErrors;
  return errors === 0;
}
const schema124 = {
  type: 'array',
  items: {
    $ref: 'xSaIsLnGBuSMLnJ24tphZSYiQas0H4Y6EAzLZwFD28',
  },
  nullable: true,
};
const schema125 = {
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
      $ref: '69mOpxlt0aD4vMopIeK0zOQ2HQ1bNRej6amKUwmAwsY',
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
    terminationReason: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    waiting: {
      $ref: 'lg9IF1VSHnPvDGbIW3n8dV1bpr1s7gp7sBns4zd8xA',
    },
  },
};
function validate462(
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
        !validate87(data.inputs, {
          instancePath: instancePath + '/inputs',
          parentData: data,
          parentDataProperty: 'inputs',
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
        !validate87(data.outputs, {
          instancePath: instancePath + '/outputs',
          parentData: data,
          parentDataProperty: 'outputs',
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
    if (data.provenance !== undefined) {
      if (
        !validate101(data.provenance, {
          instancePath: instancePath + '/provenance',
          parentData: data,
          parentDataProperty: 'provenance',
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
    if (data.results !== undefined) {
      if (
        !validate131(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate131.errors
            : vErrors.concat(validate131.errors);
        errors = vErrors.length;
      }
    }
    if (data.running !== undefined) {
      if (
        !validate137(data.running, {
          instancePath: instancePath + '/running',
          parentData: data,
          parentDataProperty: 'running',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate137.errors
            : vErrors.concat(validate137.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminated !== undefined) {
      if (
        !validate139(data.terminated, {
          instancePath: instancePath + '/terminated',
          parentData: data,
          parentDataProperty: 'terminated',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate139.errors
            : vErrors.concat(validate139.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminationReason !== undefined) {
      if (
        !validate28(data.terminationReason, {
          instancePath: instancePath + '/terminationReason',
          parentData: data,
          parentDataProperty: 'terminationReason',
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
    if (data.waiting !== undefined) {
      if (
        !validate147(data.waiting, {
          instancePath: instancePath + '/waiting',
          parentData: data,
          parentDataProperty: 'waiting',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate147.errors
            : vErrors.concat(validate147.errors);
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
  validate462.errors = vErrors;
  return errors === 0;
}
function validate461(
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
        !validate462(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate462.errors
            : vErrors.concat(validate462.errors);
        errors = vErrors.length;
      }
    }
  }
  validate461.errors = vErrors;
  return errors === 0;
}
const schema126 = {
  type: 'object',
  properties: {
    displayName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'MsDfZiS2fo9sPJDPqOjQKErAOp9nZCZ3K5fk3DRqIA',
    },
    results: {
      $ref: '0HD6qrqLUkZVSO6gwaS9Wpy76FEAdhpeRbl7DQQo',
    },
    sidecars: {
      $ref: 'stN4Qd1xg2HF4Ru2VwZucmJ3B0ckpfxQKWXNT5drzl0',
    },
    stepTemplate: {
      $ref: 'pCPnX5hWEwZAprKIJKKDagiKRXasvAJdYUqEUlxcCQ',
    },
    steps: {
      $ref: 'onyWFsfqqiMfdHjIsMa4SpsX9PHNQHzZ941CVuP3RDE',
    },
    volumes: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    workspaces: {
      $ref: '3at40CDp45qqyZORmbceYwNgG16kRfjMzS8p2eH0ok',
    },
  },
  nullable: true,
};
const schema127 = {
  type: 'array',
  items: {
    $ref: 'CubDNCGD0a691SjxZVe1ELttRW6Lby7ZJEo4gOU',
  },
  nullable: true,
};
const schema128 = {
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
const schema49 = {
  type: 'object',
  additionalProperties: {
    $ref: '12bGl5SorwtEAV7svcAR515UJ3gXm6T8AH6G7ywQ',
  },
  properties: {},
  nullable: true,
};
const schema50 = {
  type: 'object',
  properties: {
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate151(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
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
  validate151.errors = vErrors;
  return errors === 0;
}
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
    for (const key0 in data) {
      if (
        !validate151(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate151.errors
            : vErrors.concat(validate151.errors);
        errors = vErrors.length;
      }
    }
  }
  validate150.errors = vErrors;
  return errors === 0;
}
function validate479(
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
        !validate29(data.default, {
          instancePath: instancePath + '/default',
          parentData: data,
          parentDataProperty: 'default',
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
    if (data.enum !== undefined) {
      if (
        !validate30(data.enum, {
          instancePath: instancePath + '/enum',
          parentData: data,
          parentDataProperty: 'enum',
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
    if (data.properties !== undefined) {
      if (
        !validate150(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate479.errors = vErrors;
  return errors === 0;
}
function validate478(
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
        !validate479(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate479.errors
            : vErrors.concat(validate479.errors);
        errors = vErrors.length;
      }
    }
  }
  validate478.errors = vErrors;
  return errors === 0;
}
const schema129 = {
  type: 'array',
  items: {
    $ref: 'hBY6GaZx5G5HDPyn3hkp3puoD4fe3eq9LyDov9b2dk',
  },
  nullable: true,
};
const schema130 = {
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
    value: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
  },
};
function validate488(
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
    if (data.properties !== undefined) {
      if (
        !validate150(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate488.errors = vErrors;
  return errors === 0;
}
function validate487(
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
        !validate488(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate488.errors
            : vErrors.concat(validate488.errors);
        errors = vErrors.length;
      }
    }
  }
  validate487.errors = vErrors;
  return errors === 0;
}
const schema131 = {
  type: 'array',
  items: {
    $ref: 'LEXjt556gj6TSN38pzq0NjjwwNJXEeVNfY8MfrxNo',
  },
  nullable: true,
};
const schema132 = {
  type: 'object',
  required: ['name'],
  properties: {
    args: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    computeResources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    envFrom: {
      $ref: 'QY8LLDOwQOUbprWt5XxDXC7htHxRFx8dMH6i4aoiCo',
    },
    image: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imagePullPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    lifecycle: {
      $ref: 'RFdx2XZbMwDJdMr2aIABLWh6wm9pXrmT36F8JegfkcE',
    },
    livenessProbe: {
      $ref: 'S19CmLFxistbvhgJQUv3A7F53a1jsmnc16b2IMJWv4',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    ports: {
      $ref: 'QkG34wpgMYTMO9YE77bfWKFLDRsUlPeO44VNnszt7Qs',
    },
    readinessProbe: {
      $ref: 'S19CmLFxistbvhgJQUv3A7F53a1jsmnc16b2IMJWv4',
    },
    restartPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    script: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    securityContext: {
      $ref: 'ksODhjuQNaLDjLrDzCcran1NV6hbQ2VKWbCcaLbDgk',
    },
    startupProbe: {
      $ref: 'S19CmLFxistbvhgJQUv3A7F53a1jsmnc16b2IMJWv4',
    },
    stdin: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    stdinOnce: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    terminationMessagePath: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    terminationMessagePolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    tty: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    volumeDevices: {
      $ref: 'mBDhRX59TxMU0NTk7LfnSYRWB6jHAhliJbubNaMjM',
    },
    volumeMounts: {
      $ref: 'MwEW3cXYTOIY2SDIx0pDe3kixu4eIgg9HqehegFCM',
    },
    workingDir: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    workspaces: {
      $ref: '5IE4jEovzkc0IWn7c35QAhStXl4gpFLCnjkRbMZ97c',
    },
  },
};
const schema68 = {
  type: 'array',
  items: {
    $ref: 'kFpnHd2NZ4UZDP4b3m62HC4SlJSOSeKF9pyuy1Pa7OM',
  },
  nullable: true,
};
const schema69 = {
  type: 'object',
  properties: {
    configMapRef: {
      $ref: 'DuvdGxOgjR5ZX6sqFW02EKJfA7AYWoooZeAl4RjRSkM',
    },
    prefix: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    secretRef: {
      $ref: 'DuvdGxOgjR5ZX6sqFW02EKJfA7AYWoooZeAl4RjRSkM',
    },
  },
};
const schema55 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  nullable: true,
};
function validate169(
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
  validate169.errors = vErrors;
  return errors === 0;
}
function validate217(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.configMapRef !== undefined) {
      if (
        !validate169(data.configMapRef, {
          instancePath: instancePath + '/configMapRef',
          parentData: data,
          parentDataProperty: 'configMapRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate169.errors
            : vErrors.concat(validate169.errors);
        errors = vErrors.length;
      }
    }
    if (data.prefix !== undefined) {
      if (
        !validate28(data.prefix, {
          instancePath: instancePath + '/prefix',
          parentData: data,
          parentDataProperty: 'prefix',
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
    if (data.secretRef !== undefined) {
      if (
        !validate169(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate169.errors
            : vErrors.concat(validate169.errors);
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
  validate217.errors = vErrors;
  return errors === 0;
}
function validate216(
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
        !validate217(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate216.errors = vErrors;
  return errors === 0;
}
const schema133 = {
  type: 'object',
  properties: {
    postStart: {
      $ref: 'G29yhCt6zCEjqe0gdZcfsDrOST0tQlucjrHZckS9DrM',
    },
    preStop: {
      $ref: 'G29yhCt6zCEjqe0gdZcfsDrOST0tQlucjrHZckS9DrM',
    },
  },
  nullable: true,
};
const schema57 = {
  type: 'object',
  properties: {
    exec: {
      $ref: 'moEpOLb1kgFxaUouQajnrop3umuZQh81JqXQh7AIVQ',
    },
    httpGet: {
      $ref: 'mmlyBLvRl7v3o5Pp55N1xeaHQ9tDWZHs5C7b5GfLN8',
    },
    sleep: {
      $ref: 'ofdWEnL8lX9o1QCeF8oRkYTFr4DaNPrRjjEnvvp1ljA',
    },
    tcpSocket: {
      $ref: '1ZbuYUyDXQSaxhnkO1WtAhRTjyp3DzYi9wa2Pdpoow',
    },
  },
  nullable: true,
};
const schema58 = {
  type: 'object',
  properties: {
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  nullable: true,
};
function validate176(
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
    if (data.command !== undefined) {
      if (
        !validate30(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
  validate176.errors = vErrors;
  return errors === 0;
}
const schema59 = {
  type: 'object',
  required: ['port'],
  properties: {
    host: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    httpHeaders: {
      $ref: 'wOtvUyP8xBMF8YvP9G2nZ7hpGeMpOckdRUXrDPgLUY',
    },
    path: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    port: {
      $ref: 'uJPY5JwdoQeyZsG50sBXB6uBQV8ScD7PtRRAnILoI3A',
    },
    scheme: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
const schema60 = {
  type: 'array',
  items: {
    $ref: 'RI8VVk8l4SnLWK7FbWs0RBoAVoSBUKkroMUjUfsI',
  },
  nullable: true,
};
const schema61 = {
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
function validate182(
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
const schema56 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
};
function validate172(
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
  validate172.errors = vErrors;
  return errors === 0;
}
function validate179(
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
    if (data.port === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'port',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.host !== undefined) {
      if (
        !validate28(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.httpHeaders !== undefined) {
      if (
        !validate181(data.httpHeaders, {
          instancePath: instancePath + '/httpHeaders',
          parentData: data,
          parentDataProperty: 'httpHeaders',
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
    if (data.path !== undefined) {
      if (
        !validate28(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.port !== undefined) {
      if (
        !validate172(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate172.errors
            : vErrors.concat(validate172.errors);
        errors = vErrors.length;
      }
    }
    if (data.scheme !== undefined) {
      if (
        !validate28(data.scheme, {
          instancePath: instancePath + '/scheme',
          parentData: data,
          parentDataProperty: 'scheme',
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
  validate179.errors = vErrors;
  return errors === 0;
}
const schema62 = {
  type: 'object',
  required: ['seconds'],
  properties: {
    seconds: {
      $ref: 'icwF9bpzvIS3QxC52v2XvqrjjaZnFwyMbHUnptLeEQ',
    },
  },
  nullable: true,
};
const schema63 = {
  type: 'integer',
  format: 'int64',
};
function validate192(
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
    if (data.seconds === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'seconds',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.seconds !== undefined) {
      if (
        !validate192(data.seconds, {
          instancePath: instancePath + '/seconds',
          parentData: data,
          parentDataProperty: 'seconds',
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
const schema64 = {
  type: 'object',
  required: ['port'],
  properties: {
    host: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    port: {
      $ref: 'uJPY5JwdoQeyZsG50sBXB6uBQV8ScD7PtRRAnILoI3A',
    },
  },
  nullable: true,
};
function validate195(
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
    if (data.port === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'port',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.host !== undefined) {
      if (
        !validate28(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.port !== undefined) {
      if (
        !validate172(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate172.errors
            : vErrors.concat(validate172.errors);
        errors = vErrors.length;
      }
    }
  }
  validate195.errors = vErrors;
  return errors === 0;
}
function validate175(
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
    if (data.exec !== undefined) {
      if (
        !validate176(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate176.errors
            : vErrors.concat(validate176.errors);
        errors = vErrors.length;
      }
    }
    if (data.httpGet !== undefined) {
      if (
        !validate179(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.sleep !== undefined) {
      if (
        !validate191(data.sleep, {
          instancePath: instancePath + '/sleep',
          parentData: data,
          parentDataProperty: 'sleep',
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
    if (data.tcpSocket !== undefined) {
      if (
        !validate195(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate195.errors
            : vErrors.concat(validate195.errors);
        errors = vErrors.length;
      }
    }
  }
  validate175.errors = vErrors;
  return errors === 0;
}
function validate504(
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
    if (data.postStart !== undefined) {
      if (
        !validate175(data.postStart, {
          instancePath: instancePath + '/postStart',
          parentData: data,
          parentDataProperty: 'postStart',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate175.errors
            : vErrors.concat(validate175.errors);
        errors = vErrors.length;
      }
    }
    if (data.preStop !== undefined) {
      if (
        !validate175(data.preStop, {
          instancePath: instancePath + '/preStop',
          parentData: data,
          parentDataProperty: 'preStop',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate175.errors
            : vErrors.concat(validate175.errors);
        errors = vErrors.length;
      }
    }
  }
  validate504.errors = vErrors;
  return errors === 0;
}
const schema65 = {
  type: 'object',
  properties: {
    exec: {
      $ref: 'moEpOLb1kgFxaUouQajnrop3umuZQh81JqXQh7AIVQ',
    },
    failureThreshold: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    grpc: {
      $ref: 'NUK0BCpeJqFgQXTWBzj0eOYRucFLFw8myUZsnxSeHQ',
    },
    httpGet: {
      $ref: 'mmlyBLvRl7v3o5Pp55N1xeaHQ9tDWZHs5C7b5GfLN8',
    },
    initialDelaySeconds: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    periodSeconds: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    successThreshold: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    tcpSocket: {
      $ref: '1ZbuYUyDXQSaxhnkO1WtAhRTjyp3DzYi9wa2Pdpoow',
    },
    terminationGracePeriodSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    timeoutSeconds: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
  },
  nullable: true,
};
const schema66 = {
  type: 'object',
  required: ['port'],
  properties: {
    port: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    service: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  nullable: true,
};
function validate202(
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
    if (data.port === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'port',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.port !== undefined) {
      if (
        !validate100(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
    if (data.service !== undefined) {
      if (
        !validate35(data.service, {
          instancePath: instancePath + '/service',
          parentData: data,
          parentDataProperty: 'service',
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
  validate202.errors = vErrors;
  return errors === 0;
}
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
    if (data.exec !== undefined) {
      if (
        !validate176(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate176.errors
            : vErrors.concat(validate176.errors);
        errors = vErrors.length;
      }
    }
    if (data.failureThreshold !== undefined) {
      if (
        !validate59(data.failureThreshold, {
          instancePath: instancePath + '/failureThreshold',
          parentData: data,
          parentDataProperty: 'failureThreshold',
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
    if (data.grpc !== undefined) {
      if (
        !validate202(data.grpc, {
          instancePath: instancePath + '/grpc',
          parentData: data,
          parentDataProperty: 'grpc',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate202.errors
            : vErrors.concat(validate202.errors);
        errors = vErrors.length;
      }
    }
    if (data.httpGet !== undefined) {
      if (
        !validate179(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.initialDelaySeconds !== undefined) {
      if (
        !validate59(data.initialDelaySeconds, {
          instancePath: instancePath + '/initialDelaySeconds',
          parentData: data,
          parentDataProperty: 'initialDelaySeconds',
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
    if (data.periodSeconds !== undefined) {
      if (
        !validate59(data.periodSeconds, {
          instancePath: instancePath + '/periodSeconds',
          parentData: data,
          parentDataProperty: 'periodSeconds',
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
    if (data.successThreshold !== undefined) {
      if (
        !validate59(data.successThreshold, {
          instancePath: instancePath + '/successThreshold',
          parentData: data,
          parentDataProperty: 'successThreshold',
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
    if (data.tcpSocket !== undefined) {
      if (
        !validate195(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate195.errors
            : vErrors.concat(validate195.errors);
        errors = vErrors.length;
      }
    }
    if (data.terminationGracePeriodSeconds !== undefined) {
      if (
        !validate86(data.terminationGracePeriodSeconds, {
          instancePath: instancePath + '/terminationGracePeriodSeconds',
          parentData: data,
          parentDataProperty: 'terminationGracePeriodSeconds',
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
    if (data.timeoutSeconds !== undefined) {
      if (
        !validate59(data.timeoutSeconds, {
          instancePath: instancePath + '/timeoutSeconds',
          parentData: data,
          parentDataProperty: 'timeoutSeconds',
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
  }
  validate199.errors = vErrors;
  return errors === 0;
}
const schema134 = {
  type: 'array',
  items: {
    $ref: 'WxMipWUqqSfo29Ftt21K0qdNOM8gEudjMjxXtvA',
  },
  nullable: true,
};
const schema135 = {
  type: 'object',
  required: ['containerPort'],
  properties: {
    containerPort: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    hostIP: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    hostPort: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    protocol: {
      $ref: 'WjWl4gI0zAjaPoQiailk8NsLbKtD9AmRfEZB1lmJptc',
    },
  },
};
const schema136 = {
  type: 'string',
  default: 'TCP',
  nullable: true,
};
function validate516(
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
  validate516.errors = vErrors;
  return errors === 0;
}
function validate511(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.containerPort === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'containerPort',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.containerPort !== undefined) {
      if (
        !validate100(data.containerPort, {
          instancePath: instancePath + '/containerPort',
          parentData: data,
          parentDataProperty: 'containerPort',
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
    if (data.hostIP !== undefined) {
      if (
        !validate28(data.hostIP, {
          instancePath: instancePath + '/hostIP',
          parentData: data,
          parentDataProperty: 'hostIP',
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
    if (data.hostPort !== undefined) {
      if (
        !validate59(data.hostPort, {
          instancePath: instancePath + '/hostPort',
          parentData: data,
          parentDataProperty: 'hostPort',
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
    if (data.protocol !== undefined) {
      if (
        !validate516(data.protocol, {
          instancePath: instancePath + '/protocol',
          parentData: data,
          parentDataProperty: 'protocol',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate516.errors
            : vErrors.concat(validate516.errors);
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
  validate511.errors = vErrors;
  return errors === 0;
}
function validate510(
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
        !validate511(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate511.errors
            : vErrors.concat(validate511.errors);
        errors = vErrors.length;
      }
    }
  }
  validate510.errors = vErrors;
  return errors === 0;
}
const schema70 = {
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
const schema67 = {
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
function validate213(
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
        !validate28(data.localhostProfile, {
          instancePath: instancePath + '/localhostProfile',
          parentData: data,
          parentDataProperty: 'localhostProfile',
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
  validate213.errors = vErrors;
  return errors === 0;
}
const schema71 = {
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
    if (data.add !== undefined) {
      if (
        !validate30(data.add, {
          instancePath: instancePath + '/add',
          parentData: data,
          parentDataProperty: 'add',
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
    if (data.drop !== undefined) {
      if (
        !validate30(data.drop, {
          instancePath: instancePath + '/drop',
          parentData: data,
          parentDataProperty: 'drop',
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
function validate235(
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
        !validate28(data.level, {
          instancePath: instancePath + '/level',
          parentData: data,
          parentDataProperty: 'level',
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
    if (data.role !== undefined) {
      if (
        !validate28(data.role, {
          instancePath: instancePath + '/role',
          parentData: data,
          parentDataProperty: 'role',
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
    if (data.user !== undefined) {
      if (
        !validate28(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
  validate235.errors = vErrors;
  return errors === 0;
}
const schema73 = {
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
function validate242(
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
        !validate28(data.gmsaCredentialSpec, {
          instancePath: instancePath + '/gmsaCredentialSpec',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpec',
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
    if (data.gmsaCredentialSpecName !== undefined) {
      if (
        !validate28(data.gmsaCredentialSpecName, {
          instancePath: instancePath + '/gmsaCredentialSpecName',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpecName',
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
    if (data.hostProcess !== undefined) {
      if (
        !validate32(data.hostProcess, {
          instancePath: instancePath + '/hostProcess',
          parentData: data,
          parentDataProperty: 'hostProcess',
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
    if (data.runAsUserName !== undefined) {
      if (
        !validate28(data.runAsUserName, {
          instancePath: instancePath + '/runAsUserName',
          parentData: data,
          parentDataProperty: 'runAsUserName',
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
  validate242.errors = vErrors;
  return errors === 0;
}
function validate222(
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
        !validate32(data.allowPrivilegeEscalation, {
          instancePath: instancePath + '/allowPrivilegeEscalation',
          parentData: data,
          parentDataProperty: 'allowPrivilegeEscalation',
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
    if (data.appArmorProfile !== undefined) {
      if (
        !validate213(data.appArmorProfile, {
          instancePath: instancePath + '/appArmorProfile',
          parentData: data,
          parentDataProperty: 'appArmorProfile',
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
    if (data.capabilities !== undefined) {
      if (
        !validate225(data.capabilities, {
          instancePath: instancePath + '/capabilities',
          parentData: data,
          parentDataProperty: 'capabilities',
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
    if (data.privileged !== undefined) {
      if (
        !validate32(data.privileged, {
          instancePath: instancePath + '/privileged',
          parentData: data,
          parentDataProperty: 'privileged',
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
    if (data.procMount !== undefined) {
      if (
        !validate28(data.procMount, {
          instancePath: instancePath + '/procMount',
          parentData: data,
          parentDataProperty: 'procMount',
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
    if (data.readOnlyRootFilesystem !== undefined) {
      if (
        !validate32(data.readOnlyRootFilesystem, {
          instancePath: instancePath + '/readOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'readOnlyRootFilesystem',
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
    if (data.runAsGroup !== undefined) {
      if (
        !validate86(data.runAsGroup, {
          instancePath: instancePath + '/runAsGroup',
          parentData: data,
          parentDataProperty: 'runAsGroup',
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
    if (data.runAsNonRoot !== undefined) {
      if (
        !validate32(data.runAsNonRoot, {
          instancePath: instancePath + '/runAsNonRoot',
          parentData: data,
          parentDataProperty: 'runAsNonRoot',
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
    if (data.runAsUser !== undefined) {
      if (
        !validate86(data.runAsUser, {
          instancePath: instancePath + '/runAsUser',
          parentData: data,
          parentDataProperty: 'runAsUser',
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
    if (data.seLinuxOptions !== undefined) {
      if (
        !validate235(data.seLinuxOptions, {
          instancePath: instancePath + '/seLinuxOptions',
          parentData: data,
          parentDataProperty: 'seLinuxOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate235.errors
            : vErrors.concat(validate235.errors);
        errors = vErrors.length;
      }
    }
    if (data.seccompProfile !== undefined) {
      if (
        !validate213(data.seccompProfile, {
          instancePath: instancePath + '/seccompProfile',
          parentData: data,
          parentDataProperty: 'seccompProfile',
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
    if (data.windowsOptions !== undefined) {
      if (
        !validate242(data.windowsOptions, {
          instancePath: instancePath + '/windowsOptions',
          parentData: data,
          parentDataProperty: 'windowsOptions',
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
  }
  validate222.errors = vErrors;
  return errors === 0;
}
const schema74 = {
  type: 'array',
  items: {
    $ref: 'RyMynCzjYAPHCEQqWFiO4dTDXuIMC11XbOjI4iorY',
  },
  nullable: true,
};
const schema75 = {
  type: 'object',
  required: ['devicePath', 'name'],
  properties: {
    devicePath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate249(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.devicePath === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'devicePath',
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
    if (data.devicePath !== undefined) {
      if (
        !validate21(data.devicePath, {
          instancePath: instancePath + '/devicePath',
          parentData: data,
          parentDataProperty: 'devicePath',
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
  validate249.errors = vErrors;
  return errors === 0;
}
function validate248(
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
        !validate249(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate249.errors
            : vErrors.concat(validate249.errors);
        errors = vErrors.length;
      }
    }
  }
  validate248.errors = vErrors;
  return errors === 0;
}
const schema76 = {
  type: 'array',
  items: {
    $ref: 'SEp18EkqjgXWMJk6uDMmapPUotqVJbrnxhdiX2GuEY',
  },
  nullable: true,
};
const schema77 = {
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
function validate254(
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
        !validate21(data.mountPath, {
          instancePath: instancePath + '/mountPath',
          parentData: data,
          parentDataProperty: 'mountPath',
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
    if (data.mountPropagation !== undefined) {
      if (
        !validate28(data.mountPropagation, {
          instancePath: instancePath + '/mountPropagation',
          parentData: data,
          parentDataProperty: 'mountPropagation',
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
    if (data.recursiveReadOnly !== undefined) {
      if (
        !validate28(data.recursiveReadOnly, {
          instancePath: instancePath + '/recursiveReadOnly',
          parentData: data,
          parentDataProperty: 'recursiveReadOnly',
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
    if (data.subPathExpr !== undefined) {
      if (
        !validate28(data.subPathExpr, {
          instancePath: instancePath + '/subPathExpr',
          parentData: data,
          parentDataProperty: 'subPathExpr',
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
  validate254.errors = vErrors;
  return errors === 0;
}
function validate253(
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
        !validate254(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate254.errors
            : vErrors.concat(validate254.errors);
        errors = vErrors.length;
      }
    }
  }
  validate253.errors = vErrors;
  return errors === 0;
}
const schema79 = {
  type: 'array',
  items: {
    $ref: '2OivYcN4Pa7vgEbhxGmdWJz9YYIax6baoWV5qvc',
  },
  nullable: true,
};
const schema80 = {
  type: 'object',
  required: ['mountPath', 'name'],
  properties: {
    mountPath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate266(
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
        !validate21(data.mountPath, {
          instancePath: instancePath + '/mountPath',
          parentData: data,
          parentDataProperty: 'mountPath',
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
  validate266.errors = vErrors;
  return errors === 0;
}
function validate265(
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
        !validate266(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate266.errors
            : vErrors.concat(validate266.errors);
        errors = vErrors.length;
      }
    }
  }
  validate265.errors = vErrors;
  return errors === 0;
}
function validate496(
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
    if (data.args !== undefined) {
      if (
        !validate30(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate30(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate154(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate158(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate158.errors
            : vErrors.concat(validate158.errors);
        errors = vErrors.length;
      }
    }
    if (data.envFrom !== undefined) {
      if (
        !validate216(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.image !== undefined) {
      if (
        !validate28(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate28(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.lifecycle !== undefined) {
      if (
        !validate504(data.lifecycle, {
          instancePath: instancePath + '/lifecycle',
          parentData: data,
          parentDataProperty: 'lifecycle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate504.errors
            : vErrors.concat(validate504.errors);
        errors = vErrors.length;
      }
    }
    if (data.livenessProbe !== undefined) {
      if (
        !validate199(data.livenessProbe, {
          instancePath: instancePath + '/livenessProbe',
          parentData: data,
          parentDataProperty: 'livenessProbe',
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
    if (data.ports !== undefined) {
      if (
        !validate510(data.ports, {
          instancePath: instancePath + '/ports',
          parentData: data,
          parentDataProperty: 'ports',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate510.errors
            : vErrors.concat(validate510.errors);
        errors = vErrors.length;
      }
    }
    if (data.readinessProbe !== undefined) {
      if (
        !validate199(data.readinessProbe, {
          instancePath: instancePath + '/readinessProbe',
          parentData: data,
          parentDataProperty: 'readinessProbe',
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
    if (data.restartPolicy !== undefined) {
      if (
        !validate28(data.restartPolicy, {
          instancePath: instancePath + '/restartPolicy',
          parentData: data,
          parentDataProperty: 'restartPolicy',
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
    if (data.script !== undefined) {
      if (
        !validate28(data.script, {
          instancePath: instancePath + '/script',
          parentData: data,
          parentDataProperty: 'script',
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
        !validate222(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate222.errors
            : vErrors.concat(validate222.errors);
        errors = vErrors.length;
      }
    }
    if (data.startupProbe !== undefined) {
      if (
        !validate199(data.startupProbe, {
          instancePath: instancePath + '/startupProbe',
          parentData: data,
          parentDataProperty: 'startupProbe',
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
    if (data.stdin !== undefined) {
      if (
        !validate32(data.stdin, {
          instancePath: instancePath + '/stdin',
          parentData: data,
          parentDataProperty: 'stdin',
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
    if (data.stdinOnce !== undefined) {
      if (
        !validate32(data.stdinOnce, {
          instancePath: instancePath + '/stdinOnce',
          parentData: data,
          parentDataProperty: 'stdinOnce',
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
    if (data.terminationMessagePath !== undefined) {
      if (
        !validate28(data.terminationMessagePath, {
          instancePath: instancePath + '/terminationMessagePath',
          parentData: data,
          parentDataProperty: 'terminationMessagePath',
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
    if (data.terminationMessagePolicy !== undefined) {
      if (
        !validate28(data.terminationMessagePolicy, {
          instancePath: instancePath + '/terminationMessagePolicy',
          parentData: data,
          parentDataProperty: 'terminationMessagePolicy',
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
    if (data.tty !== undefined) {
      if (
        !validate32(data.tty, {
          instancePath: instancePath + '/tty',
          parentData: data,
          parentDataProperty: 'tty',
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate248(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate253(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate253.errors
            : vErrors.concat(validate253.errors);
        errors = vErrors.length;
      }
    }
    if (data.workingDir !== undefined) {
      if (
        !validate28(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
        !validate265(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  validate496.errors = vErrors;
  return errors === 0;
}
function validate495(
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
        !validate496(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate496.errors
            : vErrors.concat(validate496.errors);
        errors = vErrors.length;
      }
    }
  }
  validate495.errors = vErrors;
  return errors === 0;
}
const schema137 = {
  type: 'object',
  properties: {
    args: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    computeResources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    envFrom: {
      $ref: 'QY8LLDOwQOUbprWt5XxDXC7htHxRFx8dMH6i4aoiCo',
    },
    image: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imagePullPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    securityContext: {
      $ref: 'ksODhjuQNaLDjLrDzCcran1NV6hbQ2VKWbCcaLbDgk',
    },
    volumeDevices: {
      $ref: 'mBDhRX59TxMU0NTk7LfnSYRWB6jHAhliJbubNaMjM',
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
function validate536(
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
        !validate30(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate30(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate154(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate158(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate158.errors
            : vErrors.concat(validate158.errors);
        errors = vErrors.length;
      }
    }
    if (data.envFrom !== undefined) {
      if (
        !validate216(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.image !== undefined) {
      if (
        !validate28(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate28(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
        !validate222(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate222.errors
            : vErrors.concat(validate222.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeDevices !== undefined) {
      if (
        !validate248(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate253(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate253.errors
            : vErrors.concat(validate253.errors);
        errors = vErrors.length;
      }
    }
    if (data.workingDir !== undefined) {
      if (
        !validate28(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
  validate536.errors = vErrors;
  return errors === 0;
}
const schema138 = {
  type: 'array',
  items: {
    $ref: 'I4wwQEM5iKk9BkpITG4IcZMZgGeLI4Io8LS0sRgu1is',
  },
  nullable: true,
};
const schema139 = {
  type: 'object',
  required: ['name'],
  properties: {
    args: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    computeResources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    envFrom: {
      $ref: 'QY8LLDOwQOUbprWt5XxDXC7htHxRFx8dMH6i4aoiCo',
    },
    image: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imagePullPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    onError: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    ref: {
      $ref: 'fGxQaogvZZQK1R1cp1JVlzl3DOWbi2hM2KgwwYMKU',
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
    stderrConfig: {
      $ref: '2bCDTZJwR33AJj40VYKGmCIedj2GkHTOP942I2qxF0',
    },
    stdoutConfig: {
      $ref: '2bCDTZJwR33AJj40VYKGmCIedj2GkHTOP942I2qxF0',
    },
    timeout: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeDevices: {
      $ref: 'mBDhRX59TxMU0NTk7LfnSYRWB6jHAhliJbubNaMjM',
    },
    volumeMounts: {
      $ref: 'MwEW3cXYTOIY2SDIx0pDe3kixu4eIgg9HqehegFCM',
    },
    when: {
      $ref: 'K2jFzIlzvsHrdJrlU7ViVjY6dhLP4wG3VXFMAwf9U',
    },
    workingDir: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    workspaces: {
      $ref: '5IE4jEovzkc0IWn7c35QAhStXl4gpFLCnjkRbMZ97c',
    },
  },
};
const schema140 = {
  type: 'object',
  properties: {
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
function validate561(
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
        !validate54(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate54.errors
            : vErrors.concat(validate54.errors);
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
  validate561.errors = vErrors;
  return errors === 0;
}
const schema141 = {
  type: 'array',
  items: {
    $ref: 'QmNiMvHAKpVlhCzW7RrhzkIVmJq1SAWW3tht7K95I',
  },
  nullable: true,
};
const schema142 = {
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
function validate567(
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
    if (data.properties !== undefined) {
      if (
        !validate150(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate567.errors = vErrors;
  return errors === 0;
}
function validate566(
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
        !validate567(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate567.errors
            : vErrors.concat(validate567.errors);
        errors = vErrors.length;
      }
    }
  }
  validate566.errors = vErrors;
  return errors === 0;
}
const schema78 = {
  type: 'object',
  properties: {
    path: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
function validate263(
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
    if (data.path !== undefined) {
      if (
        !validate28(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
  validate263.errors = vErrors;
  return errors === 0;
}
const schema143 = {
  type: 'array',
  items: {
    $ref: '3gytCkvMwLExpL6MGpbNjXP74frkSgUMMmU0dalCk',
  },
  nullable: true,
};
const schema144 = {
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
function validate581(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.cel !== undefined) {
      if (
        !validate28(data.cel, {
          instancePath: instancePath + '/cel',
          parentData: data,
          parentDataProperty: 'cel',
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
    if (data.input !== undefined) {
      if (
        !validate28(data.input, {
          instancePath: instancePath + '/input',
          parentData: data,
          parentDataProperty: 'input',
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
  validate581.errors = vErrors;
  return errors === 0;
}
function validate580(
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
        !validate581(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate581.errors
            : vErrors.concat(validate581.errors);
        errors = vErrors.length;
      }
    }
  }
  validate580.errors = vErrors;
  return errors === 0;
}
function validate550(
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
    if (data.args !== undefined) {
      if (
        !validate30(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate30(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate154(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate158(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate158.errors
            : vErrors.concat(validate158.errors);
        errors = vErrors.length;
      }
    }
    if (data.envFrom !== undefined) {
      if (
        !validate216(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.image !== undefined) {
      if (
        !validate28(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate28(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.onError !== undefined) {
      if (
        !validate28(data.onError, {
          instancePath: instancePath + '/onError',
          parentData: data,
          parentDataProperty: 'onError',
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
        !validate54(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate54.errors
            : vErrors.concat(validate54.errors);
        errors = vErrors.length;
      }
    }
    if (data.ref !== undefined) {
      if (
        !validate561(data.ref, {
          instancePath: instancePath + '/ref',
          parentData: data,
          parentDataProperty: 'ref',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate561.errors
            : vErrors.concat(validate561.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate566(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate566.errors
            : vErrors.concat(validate566.errors);
        errors = vErrors.length;
      }
    }
    if (data.script !== undefined) {
      if (
        !validate28(data.script, {
          instancePath: instancePath + '/script',
          parentData: data,
          parentDataProperty: 'script',
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
        !validate222(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate222.errors
            : vErrors.concat(validate222.errors);
        errors = vErrors.length;
      }
    }
    if (data.stderrConfig !== undefined) {
      if (
        !validate263(data.stderrConfig, {
          instancePath: instancePath + '/stderrConfig',
          parentData: data,
          parentDataProperty: 'stderrConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate263.errors
            : vErrors.concat(validate263.errors);
        errors = vErrors.length;
      }
    }
    if (data.stdoutConfig !== undefined) {
      if (
        !validate263(data.stdoutConfig, {
          instancePath: instancePath + '/stdoutConfig',
          parentData: data,
          parentDataProperty: 'stdoutConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate263.errors
            : vErrors.concat(validate263.errors);
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate248(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate253(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate253.errors
            : vErrors.concat(validate253.errors);
        errors = vErrors.length;
      }
    }
    if (data.when !== undefined) {
      if (
        !validate580(data.when, {
          instancePath: instancePath + '/when',
          parentData: data,
          parentDataProperty: 'when',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate580.errors
            : vErrors.concat(validate580.errors);
        errors = vErrors.length;
      }
    }
    if (data.workingDir !== undefined) {
      if (
        !validate28(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
        !validate265(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  validate550.errors = vErrors;
  return errors === 0;
}
function validate549(
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
        !validate550(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate550.errors
            : vErrors.concat(validate550.errors);
        errors = vErrors.length;
      }
    }
  }
  validate549.errors = vErrors;
  return errors === 0;
}
const schema145 = {
  type: 'array',
  items: {
    $ref: 'sPikpQ5fROCOc32uo1z3nO4gsZ0t7zppWGi1oJzrAU',
  },
  nullable: true,
};
const schema146 = {
  type: 'object',
  required: ['name'],
  properties: {
    mountPath: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
};
function validate594(
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
    if (data.mountPath !== undefined) {
      if (
        !validate28(data.mountPath, {
          instancePath: instancePath + '/mountPath',
          parentData: data,
          parentDataProperty: 'mountPath',
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
  validate594.errors = vErrors;
  return errors === 0;
}
function validate593(
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
        !validate594(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate594.errors
            : vErrors.concat(validate594.errors);
        errors = vErrors.length;
      }
    }
  }
  validate593.errors = vErrors;
  return errors === 0;
}
function validate476(
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
    if (data.displayName !== undefined) {
      if (
        !validate28(data.displayName, {
          instancePath: instancePath + '/displayName',
          parentData: data,
          parentDataProperty: 'displayName',
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
        !validate478(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate478.errors
            : vErrors.concat(validate478.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate487(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate487.errors
            : vErrors.concat(validate487.errors);
        errors = vErrors.length;
      }
    }
    if (data.sidecars !== undefined) {
      if (
        !validate495(data.sidecars, {
          instancePath: instancePath + '/sidecars',
          parentData: data,
          parentDataProperty: 'sidecars',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate495.errors
            : vErrors.concat(validate495.errors);
        errors = vErrors.length;
      }
    }
    if (data.stepTemplate !== undefined) {
      if (
        !validate536(data.stepTemplate, {
          instancePath: instancePath + '/stepTemplate',
          parentData: data,
          parentDataProperty: 'stepTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate536.errors
            : vErrors.concat(validate536.errors);
        errors = vErrors.length;
      }
    }
    if (data.steps !== undefined) {
      if (
        !validate549(data.steps, {
          instancePath: instancePath + '/steps',
          parentData: data,
          parentDataProperty: 'steps',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate549.errors
            : vErrors.concat(validate549.errors);
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
    if (data.workspaces !== undefined) {
      if (
        !validate593(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate593.errors
            : vErrors.concat(validate593.errors);
        errors = vErrors.length;
      }
    }
  }
  validate476.errors = vErrors;
  return errors === 0;
}
function validate427(
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
    if (data.artifacts !== undefined) {
      if (
        !validate429(data.artifacts, {
          instancePath: instancePath + '/artifacts',
          parentData: data,
          parentDataProperty: 'artifacts',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate429.errors
            : vErrors.concat(validate429.errors);
        errors = vErrors.length;
      }
    }
    if (data.completionTime !== undefined) {
      if (
        !validate99(data.completionTime, {
          instancePath: instancePath + '/completionTime',
          parentData: data,
          parentDataProperty: 'completionTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate99.errors
            : vErrors.concat(validate99.errors);
        errors = vErrors.length;
      }
    }
    if (data.conditions !== undefined) {
      if (
        !validate434(data.conditions, {
          instancePath: instancePath + '/conditions',
          parentData: data,
          parentDataProperty: 'conditions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate434.errors
            : vErrors.concat(validate434.errors);
        errors = vErrors.length;
      }
    }
    if (data.observedGeneration !== undefined) {
      if (
        !validate86(data.observedGeneration, {
          instancePath: instancePath + '/observedGeneration',
          parentData: data,
          parentDataProperty: 'observedGeneration',
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
        !validate101(data.provenance, {
          instancePath: instancePath + '/provenance',
          parentData: data,
          parentDataProperty: 'provenance',
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
    if (data.results !== undefined) {
      if (
        !validate131(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate131.errors
            : vErrors.concat(validate131.errors);
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
        !validate449(data.sidecars, {
          instancePath: instancePath + '/sidecars',
          parentData: data,
          parentDataProperty: 'sidecars',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate449.errors
            : vErrors.concat(validate449.errors);
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
        !validate99(data.startTime, {
          instancePath: instancePath + '/startTime',
          parentData: data,
          parentDataProperty: 'startTime',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate99.errors
            : vErrors.concat(validate99.errors);
        errors = vErrors.length;
      }
    }
    if (data.steps !== undefined) {
      if (
        !validate461(data.steps, {
          instancePath: instancePath + '/steps',
          parentData: data,
          parentDataProperty: 'steps',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate461.errors
            : vErrors.concat(validate461.errors);
        errors = vErrors.length;
      }
    }
    if (data.taskSpec !== undefined) {
      if (
        !validate476(data.taskSpec, {
          instancePath: instancePath + '/taskSpec',
          parentData: data,
          parentDataProperty: 'taskSpec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate476.errors
            : vErrors.concat(validate476.errors);
        errors = vErrors.length;
      }
    }
  }
  validate427.errors = vErrors;
  return errors === 0;
}
function validate270(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1.TaskRun" */
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
        !validate271(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate271.errors
            : vErrors.concat(validate271.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate273(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate273.errors
            : vErrors.concat(validate273.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate275(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate279(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
    if (data.status !== undefined) {
      if (
        !validate427(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate427.errors
            : vErrors.concat(validate427.errors);
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
  validate270.errors = vErrors;
  return errors === 0;
}
