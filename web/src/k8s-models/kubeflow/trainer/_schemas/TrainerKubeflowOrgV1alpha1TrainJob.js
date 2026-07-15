import { formats } from '@kubernetes-models/validate';
export const validate = validate113;
const schema41 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'kvtw2AJp9KNqiBCxwSxxgKSqc6u3tMJ2DD9sIcv52oc',
    },
    kind: {
      $ref: 'NkIBPPCzyzuHius3J1YIkPt7uPWepE68LbZc1HfBI',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'GqIwfeNrKt3vEXcg4QuouMxqeE16JkTeqGkIVhGkUM',
    },
    status: {
      $ref: 'A9mECHeD6tG6Cxm7aWh7IiGLRNlb7UA5KDCZ7oFTKg',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'trainer.kubeflow.org.v1alpha1.TrainJob',
};
const schema42 = {
  type: 'string',
  enum: ['trainer.kubeflow.org/v1alpha1'],
};
function validate114(
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
  if (!(data === 'trainer.kubeflow.org/v1alpha1')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema42.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate114.errors = vErrors;
  return errors === 0;
}
const schema43 = {
  type: 'string',
  enum: ['TrainJob'],
};
function validate116(
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
  if (!(data === 'TrainJob')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema43.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate116.errors = vErrors;
  return errors === 0;
}
const schema44 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema45 = {};

import { validate as validate119 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate118(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate119(data, {
        instancePath,
        parentData,
        parentDataProperty,
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
  validate118.errors = vErrors;
  return errors === 0;
}
const schema46 = {
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    initializer: {
      $ref: 'e8S0571hqcjZ2pdqMw3TiD3cEoQSRI7FfQppOo0s2Io',
    },
    labels: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    managedBy: {
      $ref: 'zYdvSD1DxUiifS4BnLiWj6WhstFpACvjQ62oUQKQfzE',
    },
    podSpecOverrides: {
      $ref: 'uWZMv8lKU5M5CBLZbJtUqQ42986mmhBDrRdfMmEZWY',
    },
    runtimeRef: {
      $ref: 'lPkHZiAVVm7UyY3yt5tGELMOkwZhNuELaQK90Vbc',
    },
    suspend: {
      $ref: 'gEUOOhuZefzFQPAU2P6REZY1YYmpGc0TVbLahK1eos',
    },
    trainer: {
      $ref: 'sq2HnxzkT3yGFrf0jiFsj5mOCYWH0URuAa46hOxtJE',
    },
  },
  required: ['runtimeRef'],
  type: 'object',
  nullable: true,
};
const schema20 = {
  additionalProperties: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'object',
  properties: {},
  nullable: true,
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
  validate57.errors = vErrors;
  return errors === 0;
}
const schema47 = {
  properties: {
    dataset: {
      $ref: 'ppAUIw3LdjrJPEUAGR9WPIhU36jKodhUsaMKlNwALBU',
    },
    model: {
      $ref: 'ppAUIw3LdjrJPEUAGR9WPIhU36jKodhUsaMKlNwALBU',
    },
  },
  type: 'object',
  nullable: true,
};
const schema11 = {
  properties: {
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    storageUri: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
  nullable: true,
};
const schema12 = {
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  type: 'array',
  nullable: true,
};
const schema13 = {
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
  required: ['name'],
  type: 'object',
};
const schema7 = {
  type: 'string',
  nullable: true,
};
function validate22(
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
  validate22.errors = vErrors;
  return errors === 0;
}
const schema14 = {
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
  type: 'object',
  nullable: true,
};
const schema8 = {
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
  required: ['key'],
  type: 'object',
  nullable: true,
};
const schema9 = {
  default: '',
  type: 'string',
  nullable: true,
};
function validate25(
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
  validate25.errors = vErrors;
  return errors === 0;
}
const schema10 = {
  type: 'boolean',
  nullable: true,
};
function validate27(
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
  validate27.errors = vErrors;
  return errors === 0;
}
function validate23(
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
        !validate25(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate27(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  }
  validate23.errors = vErrors;
  return errors === 0;
}
const schema15 = {
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    fieldPath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['fieldPath'],
  type: 'object',
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
        !validate22(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
  validate36.errors = vErrors;
  return errors === 0;
}
const schema16 = {
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
  required: ['resource'],
  type: 'object',
  nullable: true,
};
const schema17 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
  pattern:
    '^(\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\\+|-)?(([0-9]+(\\.[0-9]*)?)|(\\.[0-9]+))))?$',
};
const schema18 = {
  type: 'integer',
};
function validate43(
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
  validate43.errors = vErrors;
  return errors === 0;
}
const pattern0 =
  /^(\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))))?$/u;
function validate42(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate43(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
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
        !validate22(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
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
    if (data.divisor !== undefined) {
      if (
        !validate42(data.divisor, {
          instancePath: instancePath + '/divisor',
          parentData: data,
          parentDataProperty: 'divisor',
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
  validate40.errors = vErrors;
  return errors === 0;
}
function validate34(
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
        !validate23(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
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
    if (data.fieldRef !== undefined) {
      if (
        !validate36(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate40(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
    if (data.secretKeyRef !== undefined) {
      if (
        !validate23(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
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
  validate34.errors = vErrors;
  return errors === 0;
}
function validate31(
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
        !validate22(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
    if (data.valueFrom !== undefined) {
      if (
        !validate34(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate34.errors
            : vErrors.concat(validate34.errors);
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
  validate31.errors = vErrors;
  return errors === 0;
}
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
        !validate31(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate30.errors = vErrors;
  return errors === 0;
}
const schema19 = {
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  type: 'object',
  nullable: true,
};
function validate53(
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
        !validate25(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate53.errors = vErrors;
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
    if (data.env !== undefined) {
      if (
        !validate30(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.storageUri !== undefined) {
      if (
        !validate22(data.storageUri, {
          instancePath: instancePath + '/storageUri',
          parentData: data,
          parentDataProperty: 'storageUri',
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
  validate29.errors = vErrors;
  return errors === 0;
}
function validate124(
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
    if (data.dataset !== undefined) {
      if (
        !validate29(data.dataset, {
          instancePath: instancePath + '/dataset',
          parentData: data,
          parentDataProperty: 'dataset',
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
    if (data.model !== undefined) {
      if (
        !validate29(data.model, {
          instancePath: instancePath + '/model',
          parentData: data,
          parentDataProperty: 'model',
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
  validate124.errors = vErrors;
  return errors === 0;
}
const schema48 = {
  default: 'trainer.kubeflow.org/trainjob-controller',
  type: 'string',
  nullable: true,
};
function validate129(
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
  validate129.errors = vErrors;
  return errors === 0;
}
const schema49 = {
  items: {
    $ref: 'pXhg0teg0h09kle334rGq6cAPEam48ssrZqEtMB25do',
  },
  type: 'array',
  nullable: true,
};
const schema50 = {
  properties: {
    containers: {
      $ref: 'kO8lDE4U5gkaRaW2ovLLKtluctuT877CXsJpH5aJzfw',
    },
    initContainers: {
      $ref: 'kO8lDE4U5gkaRaW2ovLLKtluctuT877CXsJpH5aJzfw',
    },
    nodeSelector: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    schedulingGates: {
      $ref: 'xcpG1cEijhhVdOeFxCi8O2nBHHEkNfBU2rvTOFs7LU',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    targetJobs: {
      $ref: 'GHUYPoAdVMLatgj5y3278S4dGAmmG3yoDnEkMDaNO0',
    },
    tolerations: {
      $ref: '0n4c9hC8BjWXgqJPcgtzXIbgzIfyT58Oy1pU5nsoec',
    },
    volumes: {
      $ref: 'LODTnLZSrHecQGhNVRXyU73kV3yOSt4amI4d6y4bVe4',
    },
  },
  required: ['targetJobs'],
  type: 'object',
};
const schema21 = {
  items: {
    $ref: 'RQLNdjrtEiDEpk2UqmUdz7zrk22kIAsr2LdxHr6VBg',
  },
  type: 'array',
  nullable: true,
};
const schema22 = {
  properties: {
    env: {
      $ref: 'Fp2cnXTLuPPYbQuoSgNTSdp3kBRCPLMm7XKVjJ7oM18',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    volumeMounts: {
      $ref: 'MwEW3cXYTOIY2SDIx0pDe3kixu4eIgg9HqehegFCM',
    },
  },
  required: ['name'],
  type: 'object',
};
const schema23 = {
  items: {
    $ref: 'SEp18EkqjgXWMJk6uDMmapPUotqVJbrnxhdiX2GuEY',
  },
  type: 'array',
  nullable: true,
};
const schema24 = {
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
  required: ['mountPath', 'name'],
  type: 'object',
};
function validate64(
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
        !validate22(data.mountPropagation, {
          instancePath: instancePath + '/mountPropagation',
          parentData: data,
          parentDataProperty: 'mountPropagation',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.recursiveReadOnly !== undefined) {
      if (
        !validate22(data.recursiveReadOnly, {
          instancePath: instancePath + '/recursiveReadOnly',
          parentData: data,
          parentDataProperty: 'recursiveReadOnly',
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
    if (data.subPath !== undefined) {
      if (
        !validate22(data.subPath, {
          instancePath: instancePath + '/subPath',
          parentData: data,
          parentDataProperty: 'subPath',
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
    if (data.subPathExpr !== undefined) {
      if (
        !validate22(data.subPathExpr, {
          instancePath: instancePath + '/subPathExpr',
          parentData: data,
          parentDataProperty: 'subPathExpr',
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
  validate64.errors = vErrors;
  return errors === 0;
}
function validate63(
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
        !validate64(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate63.errors = vErrors;
  return errors === 0;
}
function validate60(
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
    if (data.env !== undefined) {
      if (
        !validate30(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate63(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
  validate60.errors = vErrors;
  return errors === 0;
}
function validate59(
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
        !validate60(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate59.errors = vErrors;
  return errors === 0;
}
const schema51 = {
  items: {
    $ref: 'HN5PKMIdyNeW2tH5k7qzNtrzheocymAho1Vd1ZpPn9c',
  },
  type: 'array',
  nullable: true,
};
const schema25 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['name'],
  type: 'object',
};
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
function validate136(
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
  validate136.errors = vErrors;
  return errors === 0;
}
const schema52 = {
  items: {
    $ref: 'HN5PKMIdyNeW2tH5k7qzNtrzheocymAho1Vd1ZpPn9c',
  },
  type: 'array',
};
function validate140(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
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
  validate140.errors = vErrors;
  return errors === 0;
}
const schema53 = {
  items: {
    $ref: 'Me3dAzCevo9JgluOcBf4PX5XcjXOHICBlAsWQglc',
  },
  type: 'array',
  nullable: true,
};
const schema54 = {
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
  type: 'object',
};
const schema37 = {
  format: 'int64',
  type: 'integer',
  nullable: true,
};
const formats2 = formats.int64;
function validate108(
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
  validate108.errors = vErrors;
  return errors === 0;
}
function validate144(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.effect !== undefined) {
      if (
        !validate22(data.effect, {
          instancePath: instancePath + '/effect',
          parentData: data,
          parentDataProperty: 'effect',
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
    if (data.operator !== undefined) {
      if (
        !validate22(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
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
    if (data.tolerationSeconds !== undefined) {
      if (
        !validate108(data.tolerationSeconds, {
          instancePath: instancePath + '/tolerationSeconds',
          parentData: data,
          parentDataProperty: 'tolerationSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate108.errors
            : vErrors.concat(validate108.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== undefined) {
      if (
        !validate22(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate144.errors = vErrors;
  return errors === 0;
}
function validate143(
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
        !validate144(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate143.errors = vErrors;
  return errors === 0;
}
const schema55 = {
  items: {
    $ref: 'I8Qqp0YecATkXXlyfdSICIr5OCNwhrwSHu8oAIBadI',
  },
  type: 'array',
  nullable: true,
};
const schema56 = {
  properties: {
    awsElasticBlockStore: {
      $ref: 'UQa7Lhw5iGFLfJlygIJgmJ6Hywcu6Xn7okVNibWnms',
    },
    azureDisk: {
      $ref: '6VrpiZq7gq63Nz8B3KZgB1waGEHx1cX4H022KVueaA',
    },
    azureFile: {
      $ref: 'aGoyELjKgVZB0zHZY20WHspFt5yRjdEGhBhP64tI',
    },
    cephfs: {
      $ref: 'V7DogRYgVgaYZuOmnvgo0bp69dqWggIfVfnh5fI',
    },
    cinder: {
      $ref: 'pwUa0VOTZpdDthul7bNzGmwKRzfRRUThZDSTl2TI0A',
    },
    configMap: {
      $ref: '7XGmSTaS5nGo4HiXt5rfERcRI5aVsVdyyABVLyzsTI',
    },
    csi: {
      $ref: 'q2IGDntd8LFnVZFXWQ7NGhCYh1oLd4BPT8XgGqhtXI',
    },
    downwardAPI: {
      $ref: 'v1PCMNdiugdUmkd4iDaUiI9TBLV0ysLSufqr22m0o',
    },
    emptyDir: {
      $ref: 'oCPGk3BkJBAY5rCBWsfjLE97smSw378DNB3pJ2yQdAU',
    },
    ephemeral: {
      $ref: 'VTOMdjN694YPSRc6m829LepF9wfH38Z0jEhxa9Ghdo',
    },
    fc: {
      $ref: 'Uqzx5kAIsGKjouiuawWN56EiOBK7WDkCQLJuJNuomA',
    },
    flexVolume: {
      $ref: 'apnkbHaEUSMUd2SvXFBAxhOl1LNcX12Pb1CsTeWMw',
    },
    flocker: {
      $ref: 'w8yctXjkRqJ0HFoiSOCeruXgyckAOlH3vZnofJ7L9A',
    },
    gcePersistentDisk: {
      $ref: 'BPpBEgv3BVu3XQEyaunhHFel5nn4hFMSM9gwTMBvVNk',
    },
    gitRepo: {
      $ref: 'xgKgqYAOLgMggltl93ltgU0mQzey55818D1mM5ydodc',
    },
    glusterfs: {
      $ref: 'wrr3iOTI9cIafNHBkruOIMvmrMkQJyVegxJz4i6A1P8',
    },
    hostPath: {
      $ref: 'cDEhPXL8pA6Ec187LOICpIpwh0q9lmBY4g5Xl43cQ',
    },
    image: {
      $ref: 'eLKftRYTNQdAlEbeysMusycQRZrq77CUXP4kxiabOqY',
    },
    iscsi: {
      $ref: 'EFrntsOBaSHQEWRde8zp58MQEn0Elzy0dY4Gbc',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    nfs: {
      $ref: 'PTIHrR7ObpFSHfpEsbwkaEt6QpgouCTgsczNTv3E',
    },
    persistentVolumeClaim: {
      $ref: 'STKrnHXjnhmUK8ywI96Co95jk513Kd6B4STnaeRjE8',
    },
    photonPersistentDisk: {
      $ref: 'jIbK1AyqFiR5cG5FK2IbibPooMO9NkEUicdeVu1KKoE',
    },
    portworxVolume: {
      $ref: 'LeJeuVcoPGROifOKwaoW7nJYZwqn7pYot9GYlUELPI',
    },
    projected: {
      $ref: 'hWXON8W1ItzGnjJxXJXTOe3qKa0WzvG2EEBUDUkYrc',
    },
    quobyte: {
      $ref: 'LclMJcQIFOPOzptOLn5YycJLDZRCMgkHoMHc4wzDY',
    },
    rbd: {
      $ref: 'UGQ5LNnWJHfCNcTTUjafH10fczZ55u4FXj9TsuF2cc',
    },
    scaleIO: {
      $ref: 'ML7bEAKTr9pmaCetcYWr8akrG8qTQkr9hz5cgopM',
    },
    secret: {
      $ref: '7hoi1hZ13HUjcnY6nweLgqKxHiHpOSs0cLYzJyXZdI',
    },
    storageos: {
      $ref: '75iK7jeOcoHT7dVPl5RckKLEstf6F6WQcSCKsiLULqE',
    },
    vsphereVolume: {
      $ref: 'EhgFSGj2dHoIO7ucsQk2Dn5PpCIdUW0wfSO8b6GRc',
    },
  },
  required: ['name'],
  type: 'object',
};
const schema57 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    partition: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    volumeID: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['volumeID'],
  type: 'object',
  nullable: true,
};
const schema26 = {
  format: 'int32',
  type: 'integer',
  nullable: true,
};
const formats0 = formats.int32;
function validate77(
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
  validate77.errors = vErrors;
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
    if (data.volumeID === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'volumeID',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.partition !== undefined) {
      if (
        !validate77(data.partition, {
          instancePath: instancePath + '/partition',
          parentData: data,
          parentDataProperty: 'partition',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.volumeID !== undefined) {
      if (
        !validate21(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate154.errors = vErrors;
  return errors === 0;
}
const schema58 = {
  properties: {
    cachingMode: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    diskName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    diskURI: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    fsType: {
      $ref: 'fruMM8c2iIgRRTLck0QLTmUb8quBZQb07PZ9rS2bs',
    },
    kind: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'gEUOOhuZefzFQPAU2P6REZY1YYmpGc0TVbLahK1eos',
    },
  },
  required: ['diskName', 'diskURI'],
  type: 'object',
  nullable: true,
};
const schema59 = {
  default: 'ext4',
  type: 'string',
  nullable: true,
};
function validate164(
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
  validate164.errors = vErrors;
  return errors === 0;
}
const schema39 = {
  default: false,
  type: 'boolean',
  nullable: true,
};
function validate111(
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
  validate111.errors = vErrors;
  return errors === 0;
}
function validate160(
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
    if (data.diskName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'diskName',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.diskURI === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'diskURI',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.cachingMode !== undefined) {
      if (
        !validate22(data.cachingMode, {
          instancePath: instancePath + '/cachingMode',
          parentData: data,
          parentDataProperty: 'cachingMode',
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
    if (data.diskName !== undefined) {
      if (
        !validate21(data.diskName, {
          instancePath: instancePath + '/diskName',
          parentData: data,
          parentDataProperty: 'diskName',
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
    if (data.diskURI !== undefined) {
      if (
        !validate21(data.diskURI, {
          instancePath: instancePath + '/diskURI',
          parentData: data,
          parentDataProperty: 'diskURI',
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
        !validate164(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate164.errors
            : vErrors.concat(validate164.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate22(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
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
        !validate111(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate160.errors = vErrors;
  return errors === 0;
}
const schema60 = {
  properties: {
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    shareName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['secretName', 'shareName'],
  type: 'object',
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
    if (data.secretName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'secretName',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.shareName === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'shareName',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.shareName !== undefined) {
      if (
        !validate21(data.shareName, {
          instancePath: instancePath + '/shareName',
          parentData: data,
          parentDataProperty: 'shareName',
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
  validate169.errors = vErrors;
  return errors === 0;
}
const schema61 = {
  properties: {
    monitors: {
      $ref: 'YwrI9eYeYzQIcdsUXH7isPYE3sgVab9JvcdpSK4GQ',
    },
    path: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretFile: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    user: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['monitors'],
  type: 'object',
  nullable: true,
};
const schema38 = {
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'array',
};
function validate109(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
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
  validate109.errors = vErrors;
  return errors === 0;
}
function validate174(
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
    if (data.monitors === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'monitors',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.monitors !== undefined) {
      if (
        !validate109(data.monitors, {
          instancePath: instancePath + '/monitors',
          parentData: data,
          parentDataProperty: 'monitors',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate109.errors
            : vErrors.concat(validate109.errors);
        errors = vErrors.length;
      }
    }
    if (data.path !== undefined) {
      if (
        !validate22(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretFile !== undefined) {
      if (
        !validate22(data.secretFile, {
          instancePath: instancePath + '/secretFile',
          parentData: data,
          parentDataProperty: 'secretFile',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== undefined) {
      if (
        !validate22(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
  validate174.errors = vErrors;
  return errors === 0;
}
const schema62 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    volumeID: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['volumeID'],
  type: 'object',
  nullable: true,
};
function validate182(
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
    if (data.volumeID === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'volumeID',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeID !== undefined) {
      if (
        !validate21(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate182.errors = vErrors;
  return errors === 0;
}
const schema63 = {
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
  type: 'object',
  nullable: true,
};
const schema32 = {
  items: {
    $ref: 'KZm4JRWtb68G65niEVa35cCfAyEYRWGkoaumd8EY',
  },
  type: 'array',
  nullable: true,
};
const schema33 = {
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
  required: ['key', 'path'],
  type: 'object',
};
function validate92(
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
        !validate77(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
    if (data.defaultMode !== undefined) {
      if (
        !validate77(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate91(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.name !== undefined) {
      if (
        !validate25(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate27(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  }
  validate188.errors = vErrors;
  return errors === 0;
}
const schema64 = {
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
  required: ['driver'],
  type: 'object',
  nullable: true,
};
function validate194(
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
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.nodePublishSecretRef !== undefined) {
      if (
        !validate53(data.nodePublishSecretRef, {
          instancePath: instancePath + '/nodePublishSecretRef',
          parentData: data,
          parentDataProperty: 'nodePublishSecretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.volumeAttributes !== undefined) {
      if (
        !validate57(data.volumeAttributes, {
          instancePath: instancePath + '/volumeAttributes',
          parentData: data,
          parentDataProperty: 'volumeAttributes',
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
  }
  validate194.errors = vErrors;
  return errors === 0;
}
const schema65 = {
  properties: {
    defaultMode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  type: 'object',
  nullable: true,
};
const schema34 = {
  items: {
    $ref: '83t6EKcTjvzxVMR8ob3sMZu0lIqxm1azYctskfY5Ks4',
  },
  type: 'array',
  nullable: true,
};
const schema35 = {
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
  required: ['path'],
  type: 'object',
};
function validate98(
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
        !validate36(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.mode !== undefined) {
      if (
        !validate77(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
        !validate40(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
  validate98.errors = vErrors;
  return errors === 0;
}
function validate97(
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
        !validate98(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate97.errors = vErrors;
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
    if (data.defaultMode !== undefined) {
      if (
        !validate77(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate97(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate97.errors
            : vErrors.concat(validate97.errors);
        errors = vErrors.length;
      }
    }
  }
  validate201.errors = vErrors;
  return errors === 0;
}
const schema66 = {
  properties: {
    medium: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sizeLimit: {
      $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
    },
  },
  type: 'object',
  nullable: true,
};
function validate205(
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
        !validate22(data.medium, {
          instancePath: instancePath + '/medium',
          parentData: data,
          parentDataProperty: 'medium',
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
    if (data.sizeLimit !== undefined) {
      if (
        !validate42(data.sizeLimit, {
          instancePath: instancePath + '/sizeLimit',
          parentData: data,
          parentDataProperty: 'sizeLimit',
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
  validate205.errors = vErrors;
  return errors === 0;
}
const schema67 = {
  properties: {
    volumeClaimTemplate: {
      $ref: 'g1Rr4sNcApDruYkFNXbkPV7gMx4KUKxqFl8Y5kCQ0g',
    },
  },
  type: 'object',
  nullable: true,
};
const schema68 = {
  properties: {
    metadata: {
      $ref: 'jynRVyKr0doMQvLMloozBEYX7ZohkIlAIqCnjwO8',
    },
    spec: {
      $ref: 'f0I4fry9NXtZiuhiSg8mrXiKL7enZzVDgFLm5gYsdM',
    },
  },
  required: ['spec'],
  type: 'object',
  nullable: true,
};
const schema69 = {
  properties: {
    annotations: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    finalizers: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    labels: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    namespace: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
  nullable: true,
};
const schema27 = {
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'array',
  nullable: true,
};
function validate78(
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
  validate78.errors = vErrors;
  return errors === 0;
}
function validate211(
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
        !validate57(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
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
    if (data.finalizers !== undefined) {
      if (
        !validate78(data.finalizers, {
          instancePath: instancePath + '/finalizers',
          parentData: data,
          parentDataProperty: 'finalizers',
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
    if (data.labels !== undefined) {
      if (
        !validate57(data.labels, {
          instancePath: instancePath + '/labels',
          parentData: data,
          parentDataProperty: 'labels',
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
    if (data.namespace !== undefined) {
      if (
        !validate22(data.namespace, {
          instancePath: instancePath + '/namespace',
          parentData: data,
          parentDataProperty: 'namespace',
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
  validate211.errors = vErrors;
  return errors === 0;
}
const schema70 = {
  properties: {
    accessModes: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    dataSource: {
      $ref: 'Ie9aGhSpjw6Qzf2P1NWEJFaL4kYcEsKAtQUYsudcc',
    },
    dataSourceRef: {
      $ref: 'seic9XJ3fvP984RfDF5jrMD1wbt6uQwMb0CTu47W2I',
    },
    resources: {
      $ref: '7WXa2aF6GMGgfmkZvnQ0mQJTzClD5QYxEdLx0dV7xuQ',
    },
    selector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    storageClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeAttributesClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeMode: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
};
const schema71 = {
  properties: {
    apiGroup: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    kind: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['kind', 'name'],
  type: 'object',
  nullable: true,
};
function validate220(
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
    if (data.name === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.apiGroup !== undefined) {
      if (
        !validate22(data.apiGroup, {
          instancePath: instancePath + '/apiGroup',
          parentData: data,
          parentDataProperty: 'apiGroup',
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
  }
  validate220.errors = vErrors;
  return errors === 0;
}
const schema72 = {
  properties: {
    apiGroup: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    kind: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    namespace: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['kind', 'name'],
  type: 'object',
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
    if (data.name === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.apiGroup !== undefined) {
      if (
        !validate22(data.apiGroup, {
          instancePath: instancePath + '/apiGroup',
          parentData: data,
          parentDataProperty: 'apiGroup',
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
    if (data.namespace !== undefined) {
      if (
        !validate22(data.namespace, {
          instancePath: instancePath + '/namespace',
          parentData: data,
          parentDataProperty: 'namespace',
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
  validate225.errors = vErrors;
  return errors === 0;
}
const schema73 = {
  properties: {
    limits: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
    requests: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
  },
  type: 'object',
  nullable: true,
};
const schema28 = {
  additionalProperties: {
    $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
  },
  type: 'object',
  properties: {},
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
    for (const key0 in data) {
      if (
        !validate42(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
  validate80.errors = vErrors;
  return errors === 0;
}
function validate231(
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
    if (data.limits !== undefined) {
      if (
        !validate80(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate80(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate231.errors = vErrors;
  return errors === 0;
}
const schema29 = {
  properties: {
    matchExpressions: {
      $ref: '9BW0WuIp1SxhBT4vHohXPUikn0YuwzPq2mNUBC1NsE',
    },
    matchLabels: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
  },
  type: 'object',
  nullable: true,
};
const schema30 = {
  items: {
    $ref: 'MkwwSDeYoT1APit7w8qsvbKCw8OynjINdeojyPgpPQ',
  },
  type: 'array',
  nullable: true,
};
const schema31 = {
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
  required: ['key', 'operator'],
  type: 'object',
};
function validate84(
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
        !validate78(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate84.errors = vErrors;
  return errors === 0;
}
function validate83(
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
        !validate84(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate83.errors = vErrors;
  return errors === 0;
}
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
    if (data.matchExpressions !== undefined) {
      if (
        !validate83(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate83.errors
            : vErrors.concat(validate83.errors);
        errors = vErrors.length;
      }
    }
    if (data.matchLabels !== undefined) {
      if (
        !validate57(data.matchLabels, {
          instancePath: instancePath + '/matchLabels',
          parentData: data,
          parentDataProperty: 'matchLabels',
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
  }
  validate82.errors = vErrors;
  return errors === 0;
}
function validate218(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.accessModes !== undefined) {
      if (
        !validate78(data.accessModes, {
          instancePath: instancePath + '/accessModes',
          parentData: data,
          parentDataProperty: 'accessModes',
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
    if (data.dataSource !== undefined) {
      if (
        !validate220(data.dataSource, {
          instancePath: instancePath + '/dataSource',
          parentData: data,
          parentDataProperty: 'dataSource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate220.errors
            : vErrors.concat(validate220.errors);
        errors = vErrors.length;
      }
    }
    if (data.dataSourceRef !== undefined) {
      if (
        !validate225(data.dataSourceRef, {
          instancePath: instancePath + '/dataSourceRef',
          parentData: data,
          parentDataProperty: 'dataSourceRef',
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
    if (data.resources !== undefined) {
      if (
        !validate231(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate231.errors
            : vErrors.concat(validate231.errors);
        errors = vErrors.length;
      }
    }
    if (data.selector !== undefined) {
      if (
        !validate82(data.selector, {
          instancePath: instancePath + '/selector',
          parentData: data,
          parentDataProperty: 'selector',
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
    if (data.storageClassName !== undefined) {
      if (
        !validate22(data.storageClassName, {
          instancePath: instancePath + '/storageClassName',
          parentData: data,
          parentDataProperty: 'storageClassName',
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
    if (data.volumeAttributesClassName !== undefined) {
      if (
        !validate22(data.volumeAttributesClassName, {
          instancePath: instancePath + '/volumeAttributesClassName',
          parentData: data,
          parentDataProperty: 'volumeAttributesClassName',
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
    if (data.volumeMode !== undefined) {
      if (
        !validate22(data.volumeMode, {
          instancePath: instancePath + '/volumeMode',
          parentData: data,
          parentDataProperty: 'volumeMode',
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
    if (data.volumeName !== undefined) {
      if (
        !validate22(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
  validate218.errors = vErrors;
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
    if (data.spec === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'spec',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.metadata !== undefined) {
      if (
        !validate211(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate211.errors
            : vErrors.concat(validate211.errors);
        errors = vErrors.length;
      }
    }
    if (data.spec !== undefined) {
      if (
        !validate218(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate218.errors
            : vErrors.concat(validate218.errors);
        errors = vErrors.length;
      }
    }
  }
  validate210.errors = vErrors;
  return errors === 0;
}
function validate209(
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
    if (data.volumeClaimTemplate !== undefined) {
      if (
        !validate210(data.volumeClaimTemplate, {
          instancePath: instancePath + '/volumeClaimTemplate',
          parentData: data,
          parentDataProperty: 'volumeClaimTemplate',
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
  }
  validate209.errors = vErrors;
  return errors === 0;
}
const schema74 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    lun: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    targetWWNs: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    wwids: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  type: 'object',
  nullable: true,
};
function validate243(
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
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.lun !== undefined) {
      if (
        !validate77(data.lun, {
          instancePath: instancePath + '/lun',
          parentData: data,
          parentDataProperty: 'lun',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.targetWWNs !== undefined) {
      if (
        !validate78(data.targetWWNs, {
          instancePath: instancePath + '/targetWWNs',
          parentData: data,
          parentDataProperty: 'targetWWNs',
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
    if (data.wwids !== undefined) {
      if (
        !validate78(data.wwids, {
          instancePath: instancePath + '/wwids',
          parentData: data,
          parentDataProperty: 'wwids',
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
  }
  validate243.errors = vErrors;
  return errors === 0;
}
const schema75 = {
  properties: {
    driver: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    options: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
  },
  required: ['driver'],
  type: 'object',
  nullable: true,
};
function validate250(
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
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.options !== undefined) {
      if (
        !validate57(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
  }
  validate250.errors = vErrors;
  return errors === 0;
}
const schema76 = {
  properties: {
    datasetName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    datasetUUID: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
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
    if (data.datasetName !== undefined) {
      if (
        !validate22(data.datasetName, {
          instancePath: instancePath + '/datasetName',
          parentData: data,
          parentDataProperty: 'datasetName',
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
    if (data.datasetUUID !== undefined) {
      if (
        !validate22(data.datasetUUID, {
          instancePath: instancePath + '/datasetUUID',
          parentData: data,
          parentDataProperty: 'datasetUUID',
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
  validate257.errors = vErrors;
  return errors === 0;
}
const schema77 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    partition: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    pdName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  required: ['pdName'],
  type: 'object',
  nullable: true,
};
function validate261(
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
    if (data.pdName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'pdName',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.partition !== undefined) {
      if (
        !validate77(data.partition, {
          instancePath: instancePath + '/partition',
          parentData: data,
          parentDataProperty: 'partition',
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
    if (data.pdName !== undefined) {
      if (
        !validate21(data.pdName, {
          instancePath: instancePath + '/pdName',
          parentData: data,
          parentDataProperty: 'pdName',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  }
  validate261.errors = vErrors;
  return errors === 0;
}
const schema78 = {
  properties: {
    directory: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    repository: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    revision: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['repository'],
  type: 'object',
  nullable: true,
};
function validate267(
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
    if (data.repository === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'repository',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.directory !== undefined) {
      if (
        !validate22(data.directory, {
          instancePath: instancePath + '/directory',
          parentData: data,
          parentDataProperty: 'directory',
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
    if (data.repository !== undefined) {
      if (
        !validate21(data.repository, {
          instancePath: instancePath + '/repository',
          parentData: data,
          parentDataProperty: 'repository',
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
    if (data.revision !== undefined) {
      if (
        !validate22(data.revision, {
          instancePath: instancePath + '/revision',
          parentData: data,
          parentDataProperty: 'revision',
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
  validate267.errors = vErrors;
  return errors === 0;
}
const schema79 = {
  properties: {
    endpoints: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  required: ['endpoints', 'path'],
  type: 'object',
  nullable: true,
};
function validate272(
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
    if (data.endpoints === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'endpoints',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.path === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'path',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.endpoints !== undefined) {
      if (
        !validate21(data.endpoints, {
          instancePath: instancePath + '/endpoints',
          parentData: data,
          parentDataProperty: 'endpoints',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  }
  validate272.errors = vErrors;
  return errors === 0;
}
const schema80 = {
  properties: {
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['path'],
  type: 'object',
  nullable: true,
};
function validate277(
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
  validate277.errors = vErrors;
  return errors === 0;
}
const schema81 = {
  properties: {
    pullPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    reference: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
  nullable: true,
};
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
    if (data.pullPolicy !== undefined) {
      if (
        !validate22(data.pullPolicy, {
          instancePath: instancePath + '/pullPolicy',
          parentData: data,
          parentDataProperty: 'pullPolicy',
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
    if (data.reference !== undefined) {
      if (
        !validate22(data.reference, {
          instancePath: instancePath + '/reference',
          parentData: data,
          parentDataProperty: 'reference',
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
  validate281.errors = vErrors;
  return errors === 0;
}
const schema82 = {
  properties: {
    chapAuthDiscovery: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    chapAuthSession: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    initiatorName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    iqn: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    iscsiInterface: {
      $ref: 'Rek3LtOlEEpHxoGZ6pShOlQzdnylOCoJWbuYOFxt4o',
    },
    lun: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    portals: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    targetPortal: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['iqn', 'lun', 'targetPortal'],
  type: 'object',
  nullable: true,
};
const schema83 = {
  default: 'default',
  type: 'string',
  nullable: true,
};
function validate291(
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
  validate291.errors = vErrors;
  return errors === 0;
}
const schema40 = {
  format: 'int32',
  type: 'integer',
};
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
function validate285(
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
    if (data.iqn === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'iqn',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.lun === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'lun',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.targetPortal === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'targetPortal',
        },
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.chapAuthDiscovery !== undefined) {
      if (
        !validate27(data.chapAuthDiscovery, {
          instancePath: instancePath + '/chapAuthDiscovery',
          parentData: data,
          parentDataProperty: 'chapAuthDiscovery',
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
    if (data.chapAuthSession !== undefined) {
      if (
        !validate27(data.chapAuthSession, {
          instancePath: instancePath + '/chapAuthSession',
          parentData: data,
          parentDataProperty: 'chapAuthSession',
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
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.initiatorName !== undefined) {
      if (
        !validate22(data.initiatorName, {
          instancePath: instancePath + '/initiatorName',
          parentData: data,
          parentDataProperty: 'initiatorName',
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
    if (data.iqn !== undefined) {
      if (
        !validate21(data.iqn, {
          instancePath: instancePath + '/iqn',
          parentData: data,
          parentDataProperty: 'iqn',
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
    if (data.iscsiInterface !== undefined) {
      if (
        !validate291(data.iscsiInterface, {
          instancePath: instancePath + '/iscsiInterface',
          parentData: data,
          parentDataProperty: 'iscsiInterface',
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
    if (data.lun !== undefined) {
      if (
        !validate112(data.lun, {
          instancePath: instancePath + '/lun',
          parentData: data,
          parentDataProperty: 'lun',
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
    if (data.portals !== undefined) {
      if (
        !validate78(data.portals, {
          instancePath: instancePath + '/portals',
          parentData: data,
          parentDataProperty: 'portals',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.targetPortal !== undefined) {
      if (
        !validate21(data.targetPortal, {
          instancePath: instancePath + '/targetPortal',
          parentData: data,
          parentDataProperty: 'targetPortal',
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
  validate285.errors = vErrors;
  return errors === 0;
}
const schema84 = {
  properties: {
    path: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    server: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['path', 'server'],
  type: 'object',
  nullable: true,
};
function validate300(
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
    if (data.server === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'server',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.server !== undefined) {
      if (
        !validate21(data.server, {
          instancePath: instancePath + '/server',
          parentData: data,
          parentDataProperty: 'server',
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
  validate300.errors = vErrors;
  return errors === 0;
}
const schema85 = {
  properties: {
    claimName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
  required: ['claimName'],
  type: 'object',
  nullable: true,
};
function validate305(
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  }
  validate305.errors = vErrors;
  return errors === 0;
}
const schema86 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    pdID: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['pdID'],
  type: 'object',
  nullable: true,
};
function validate309(
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
    if (data.pdID === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'pdID',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.pdID !== undefined) {
      if (
        !validate21(data.pdID, {
          instancePath: instancePath + '/pdID',
          parentData: data,
          parentDataProperty: 'pdID',
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
  validate309.errors = vErrors;
  return errors === 0;
}
const schema87 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    volumeID: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['volumeID'],
  type: 'object',
  nullable: true,
};
function validate313(
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
    if (data.volumeID === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'volumeID',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.volumeID !== undefined) {
      if (
        !validate21(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate313.errors = vErrors;
  return errors === 0;
}
const schema88 = {
  properties: {
    defaultMode: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    sources: {
      $ref: 'mp8JRMbiEOTZhAAcfihFgSA7DAOtNWkRHgcGCNLAA',
    },
  },
  type: 'object',
  nullable: true,
};
const schema89 = {
  items: {
    $ref: 'WICQ5kdq9kT3ygPK1xgAXHZR3qlzTXRJaybZiIbakk',
  },
  type: 'array',
  nullable: true,
};
const schema90 = {
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
  type: 'object',
};
const schema91 = {
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
  required: ['path'],
  type: 'object',
  nullable: true,
};
function validate322(
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
        !validate82(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
    if (data.optional !== undefined) {
      if (
        !validate27(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
        !validate22(data.signerName, {
          instancePath: instancePath + '/signerName',
          parentData: data,
          parentDataProperty: 'signerName',
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
  validate322.errors = vErrors;
  return errors === 0;
}
const schema36 = {
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
  type: 'object',
  nullable: true,
};
function validate104(
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
        !validate91(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.name !== undefined) {
      if (
        !validate25(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate27(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  }
  validate104.errors = vErrors;
  return errors === 0;
}
const schema92 = {
  properties: {
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  type: 'object',
  nullable: true,
};
function validate330(
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
        !validate97(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate97.errors
            : vErrors.concat(validate97.errors);
        errors = vErrors.length;
      }
    }
  }
  validate330.errors = vErrors;
  return errors === 0;
}
const schema93 = {
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
  required: ['path'],
  type: 'object',
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
        !validate22(data.audience, {
          instancePath: instancePath + '/audience',
          parentData: data,
          parentDataProperty: 'audience',
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
    if (data.expirationSeconds !== undefined) {
      if (
        !validate108(data.expirationSeconds, {
          instancePath: instancePath + '/expirationSeconds',
          parentData: data,
          parentDataProperty: 'expirationSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate108.errors
            : vErrors.concat(validate108.errors);
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
function validate321(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.clusterTrustBundle !== undefined) {
      if (
        !validate322(data.clusterTrustBundle, {
          instancePath: instancePath + '/clusterTrustBundle',
          parentData: data,
          parentDataProperty: 'clusterTrustBundle',
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
    if (data.configMap !== undefined) {
      if (
        !validate104(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate104.errors
            : vErrors.concat(validate104.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate330(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
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
    if (data.secret !== undefined) {
      if (
        !validate104(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate104.errors
            : vErrors.concat(validate104.errors);
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
  validate321.errors = vErrors;
  return errors === 0;
}
function validate320(
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
        !validate321(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate320.errors = vErrors;
  return errors === 0;
}
function validate318(
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
        !validate77(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.sources !== undefined) {
      if (
        !validate320(data.sources, {
          instancePath: instancePath + '/sources',
          parentData: data,
          parentDataProperty: 'sources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate320.errors
            : vErrors.concat(validate320.errors);
        errors = vErrors.length;
      }
    }
  }
  validate318.errors = vErrors;
  return errors === 0;
}
const schema94 = {
  properties: {
    group: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    registry: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    tenant: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    user: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volume: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['registry', 'volume'],
  type: 'object',
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
    if (data.registry === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'registry',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.volume === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'volume',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.group !== undefined) {
      if (
        !validate22(data.group, {
          instancePath: instancePath + '/group',
          parentData: data,
          parentDataProperty: 'group',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.registry !== undefined) {
      if (
        !validate21(data.registry, {
          instancePath: instancePath + '/registry',
          parentData: data,
          parentDataProperty: 'registry',
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
    if (data.tenant !== undefined) {
      if (
        !validate22(data.tenant, {
          instancePath: instancePath + '/tenant',
          parentData: data,
          parentDataProperty: 'tenant',
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
    if (data.user !== undefined) {
      if (
        !validate22(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
    if (data.volume !== undefined) {
      if (
        !validate21(data.volume, {
          instancePath: instancePath + '/volume',
          parentData: data,
          parentDataProperty: 'volume',
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
  validate342.errors = vErrors;
  return errors === 0;
}
const schema95 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    image: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    keyring: {
      $ref: 'wcOUoijn94g4h9c661orge5ilyhWtmN5jmT7fA',
    },
    monitors: {
      $ref: 'YwrI9eYeYzQIcdsUXH7isPYE3sgVab9JvcdpSK4GQ',
    },
    pool: {
      $ref: '1Lay7Pvj0jXXMuMbr1tyUd1izmZUjDctHswAAuVAK8',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    user: {
      $ref: 'lNldWo3eTocwjdyQv52uZjjzU12S0a9Dd2XIrvAM',
    },
  },
  required: ['image', 'monitors'],
  type: 'object',
  nullable: true,
};
const schema96 = {
  default: '/etc/ceph/keyring',
  type: 'string',
  nullable: true,
};
function validate353(
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
  validate353.errors = vErrors;
  return errors === 0;
}
const schema97 = {
  default: 'rbd',
  type: 'string',
  nullable: true,
};
function validate356(
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
  validate356.errors = vErrors;
  return errors === 0;
}
const schema98 = {
  default: 'admin',
  type: 'string',
  nullable: true,
};
function validate360(
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
  validate360.errors = vErrors;
  return errors === 0;
}
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
    if (data.image === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'image',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.monitors === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'monitors',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.image !== undefined) {
      if (
        !validate21(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.keyring !== undefined) {
      if (
        !validate353(data.keyring, {
          instancePath: instancePath + '/keyring',
          parentData: data,
          parentDataProperty: 'keyring',
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
    if (data.monitors !== undefined) {
      if (
        !validate109(data.monitors, {
          instancePath: instancePath + '/monitors',
          parentData: data,
          parentDataProperty: 'monitors',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate109.errors
            : vErrors.concat(validate109.errors);
        errors = vErrors.length;
      }
    }
    if (data.pool !== undefined) {
      if (
        !validate356(data.pool, {
          instancePath: instancePath + '/pool',
          parentData: data,
          parentDataProperty: 'pool',
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
    if (data.readOnly !== undefined) {
      if (
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== undefined) {
      if (
        !validate360(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
  validate350.errors = vErrors;
  return errors === 0;
}
const schema99 = {
  properties: {
    fsType: {
      $ref: 'xsSz5fpDyWsxDJvUFyf2aWOLV73MvK1lIYoieXqYog',
    },
    gateway: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    protectionDomain: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'lX4IaYIZZv1DIKZ67DpEDlNr31ePF1qx2EUDHqZRM4',
    },
    sslEnabled: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    storageMode: {
      $ref: 'dhjHNbJks3SSmCp7maq7mSID5G0GMfOufW7FGIo6Jw',
    },
    storagePool: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    system: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    volumeName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['gateway', 'secretRef', 'system'],
  type: 'object',
  nullable: true,
};
const schema100 = {
  default: 'xfs',
  type: 'string',
  nullable: true,
};
function validate364(
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
  validate364.errors = vErrors;
  return errors === 0;
}
const schema101 = {
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  type: 'object',
};
function validate369(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate25(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate369.errors = vErrors;
  return errors === 0;
}
const schema102 = {
  default: 'ThinProvisioned',
  type: 'string',
  nullable: true,
};
function validate373(
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
  validate373.errors = vErrors;
  return errors === 0;
}
function validate363(
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
    if (data.gateway === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'gateway',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.secretRef === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'secretRef',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.system === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'system',
        },
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate364(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate364.errors
            : vErrors.concat(validate364.errors);
        errors = vErrors.length;
      }
    }
    if (data.gateway !== undefined) {
      if (
        !validate21(data.gateway, {
          instancePath: instancePath + '/gateway',
          parentData: data,
          parentDataProperty: 'gateway',
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
    if (data.protectionDomain !== undefined) {
      if (
        !validate22(data.protectionDomain, {
          instancePath: instancePath + '/protectionDomain',
          parentData: data,
          parentDataProperty: 'protectionDomain',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate369(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate369.errors
            : vErrors.concat(validate369.errors);
        errors = vErrors.length;
      }
    }
    if (data.sslEnabled !== undefined) {
      if (
        !validate27(data.sslEnabled, {
          instancePath: instancePath + '/sslEnabled',
          parentData: data,
          parentDataProperty: 'sslEnabled',
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
    if (data.storageMode !== undefined) {
      if (
        !validate373(data.storageMode, {
          instancePath: instancePath + '/storageMode',
          parentData: data,
          parentDataProperty: 'storageMode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate373.errors
            : vErrors.concat(validate373.errors);
        errors = vErrors.length;
      }
    }
    if (data.storagePool !== undefined) {
      if (
        !validate22(data.storagePool, {
          instancePath: instancePath + '/storagePool',
          parentData: data,
          parentDataProperty: 'storagePool',
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
    if (data.system !== undefined) {
      if (
        !validate21(data.system, {
          instancePath: instancePath + '/system',
          parentData: data,
          parentDataProperty: 'system',
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
    if (data.volumeName !== undefined) {
      if (
        !validate22(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
  validate363.errors = vErrors;
  return errors === 0;
}
const schema103 = {
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
  type: 'object',
  nullable: true,
};
function validate379(
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
        !validate77(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate91(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
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
    if (data.optional !== undefined) {
      if (
        !validate27(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.secretName !== undefined) {
      if (
        !validate22(data.secretName, {
          instancePath: instancePath + '/secretName',
          parentData: data,
          parentDataProperty: 'secretName',
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
  validate379.errors = vErrors;
  return errors === 0;
}
const schema104 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readOnly: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    secretRef: {
      $ref: 'djGVs328hSciH0OHMT0COL6Qznbjym4m7lH8yEynDv4',
    },
    volumeName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumeNamespace: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
  nullable: true,
};
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
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
        !validate27(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate53(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate53.errors
            : vErrors.concat(validate53.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeName !== undefined) {
      if (
        !validate22(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
    if (data.volumeNamespace !== undefined) {
      if (
        !validate22(data.volumeNamespace, {
          instancePath: instancePath + '/volumeNamespace',
          parentData: data,
          parentDataProperty: 'volumeNamespace',
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
  validate385.errors = vErrors;
  return errors === 0;
}
const schema105 = {
  properties: {
    fsType: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    storagePolicyID: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    storagePolicyName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    volumePath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['volumePath'],
  type: 'object',
  nullable: true,
};
function validate392(
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
    if (data.volumePath === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'volumePath',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.fsType !== undefined) {
      if (
        !validate22(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.storagePolicyID !== undefined) {
      if (
        !validate22(data.storagePolicyID, {
          instancePath: instancePath + '/storagePolicyID',
          parentData: data,
          parentDataProperty: 'storagePolicyID',
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
    if (data.storagePolicyName !== undefined) {
      if (
        !validate22(data.storagePolicyName, {
          instancePath: instancePath + '/storagePolicyName',
          parentData: data,
          parentDataProperty: 'storagePolicyName',
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
    if (data.volumePath !== undefined) {
      if (
        !validate21(data.volumePath, {
          instancePath: instancePath + '/volumePath',
          parentData: data,
          parentDataProperty: 'volumePath',
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
  validate392.errors = vErrors;
  return errors === 0;
}
function validate153(
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
    if (data.awsElasticBlockStore !== undefined) {
      if (
        !validate154(data.awsElasticBlockStore, {
          instancePath: instancePath + '/awsElasticBlockStore',
          parentData: data,
          parentDataProperty: 'awsElasticBlockStore',
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
    if (data.azureDisk !== undefined) {
      if (
        !validate160(data.azureDisk, {
          instancePath: instancePath + '/azureDisk',
          parentData: data,
          parentDataProperty: 'azureDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate160.errors
            : vErrors.concat(validate160.errors);
        errors = vErrors.length;
      }
    }
    if (data.azureFile !== undefined) {
      if (
        !validate169(data.azureFile, {
          instancePath: instancePath + '/azureFile',
          parentData: data,
          parentDataProperty: 'azureFile',
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
    if (data.cephfs !== undefined) {
      if (
        !validate174(data.cephfs, {
          instancePath: instancePath + '/cephfs',
          parentData: data,
          parentDataProperty: 'cephfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate174.errors
            : vErrors.concat(validate174.errors);
        errors = vErrors.length;
      }
    }
    if (data.cinder !== undefined) {
      if (
        !validate182(data.cinder, {
          instancePath: instancePath + '/cinder',
          parentData: data,
          parentDataProperty: 'cinder',
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
    if (data.configMap !== undefined) {
      if (
        !validate188(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
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
    if (data.csi !== undefined) {
      if (
        !validate194(data.csi, {
          instancePath: instancePath + '/csi',
          parentData: data,
          parentDataProperty: 'csi',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate194.errors
            : vErrors.concat(validate194.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate201(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
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
    if (data.emptyDir !== undefined) {
      if (
        !validate205(data.emptyDir, {
          instancePath: instancePath + '/emptyDir',
          parentData: data,
          parentDataProperty: 'emptyDir',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate205.errors
            : vErrors.concat(validate205.errors);
        errors = vErrors.length;
      }
    }
    if (data.ephemeral !== undefined) {
      if (
        !validate209(data.ephemeral, {
          instancePath: instancePath + '/ephemeral',
          parentData: data,
          parentDataProperty: 'ephemeral',
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
    if (data.fc !== undefined) {
      if (
        !validate243(data.fc, {
          instancePath: instancePath + '/fc',
          parentData: data,
          parentDataProperty: 'fc',
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
    if (data.flexVolume !== undefined) {
      if (
        !validate250(data.flexVolume, {
          instancePath: instancePath + '/flexVolume',
          parentData: data,
          parentDataProperty: 'flexVolume',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate250.errors
            : vErrors.concat(validate250.errors);
        errors = vErrors.length;
      }
    }
    if (data.flocker !== undefined) {
      if (
        !validate257(data.flocker, {
          instancePath: instancePath + '/flocker',
          parentData: data,
          parentDataProperty: 'flocker',
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
    if (data.gcePersistentDisk !== undefined) {
      if (
        !validate261(data.gcePersistentDisk, {
          instancePath: instancePath + '/gcePersistentDisk',
          parentData: data,
          parentDataProperty: 'gcePersistentDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate261.errors
            : vErrors.concat(validate261.errors);
        errors = vErrors.length;
      }
    }
    if (data.gitRepo !== undefined) {
      if (
        !validate267(data.gitRepo, {
          instancePath: instancePath + '/gitRepo',
          parentData: data,
          parentDataProperty: 'gitRepo',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate267.errors
            : vErrors.concat(validate267.errors);
        errors = vErrors.length;
      }
    }
    if (data.glusterfs !== undefined) {
      if (
        !validate272(data.glusterfs, {
          instancePath: instancePath + '/glusterfs',
          parentData: data,
          parentDataProperty: 'glusterfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate272.errors
            : vErrors.concat(validate272.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostPath !== undefined) {
      if (
        !validate277(data.hostPath, {
          instancePath: instancePath + '/hostPath',
          parentData: data,
          parentDataProperty: 'hostPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate277.errors
            : vErrors.concat(validate277.errors);
        errors = vErrors.length;
      }
    }
    if (data.image !== undefined) {
      if (
        !validate281(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.iscsi !== undefined) {
      if (
        !validate285(data.iscsi, {
          instancePath: instancePath + '/iscsi',
          parentData: data,
          parentDataProperty: 'iscsi',
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
    if (data.nfs !== undefined) {
      if (
        !validate300(data.nfs, {
          instancePath: instancePath + '/nfs',
          parentData: data,
          parentDataProperty: 'nfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate300.errors
            : vErrors.concat(validate300.errors);
        errors = vErrors.length;
      }
    }
    if (data.persistentVolumeClaim !== undefined) {
      if (
        !validate305(data.persistentVolumeClaim, {
          instancePath: instancePath + '/persistentVolumeClaim',
          parentData: data,
          parentDataProperty: 'persistentVolumeClaim',
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
    if (data.photonPersistentDisk !== undefined) {
      if (
        !validate309(data.photonPersistentDisk, {
          instancePath: instancePath + '/photonPersistentDisk',
          parentData: data,
          parentDataProperty: 'photonPersistentDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate309.errors
            : vErrors.concat(validate309.errors);
        errors = vErrors.length;
      }
    }
    if (data.portworxVolume !== undefined) {
      if (
        !validate313(data.portworxVolume, {
          instancePath: instancePath + '/portworxVolume',
          parentData: data,
          parentDataProperty: 'portworxVolume',
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
    if (data.projected !== undefined) {
      if (
        !validate318(data.projected, {
          instancePath: instancePath + '/projected',
          parentData: data,
          parentDataProperty: 'projected',
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
    if (data.quobyte !== undefined) {
      if (
        !validate342(data.quobyte, {
          instancePath: instancePath + '/quobyte',
          parentData: data,
          parentDataProperty: 'quobyte',
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
    if (data.rbd !== undefined) {
      if (
        !validate350(data.rbd, {
          instancePath: instancePath + '/rbd',
          parentData: data,
          parentDataProperty: 'rbd',
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
    if (data.scaleIO !== undefined) {
      if (
        !validate363(data.scaleIO, {
          instancePath: instancePath + '/scaleIO',
          parentData: data,
          parentDataProperty: 'scaleIO',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate363.errors
            : vErrors.concat(validate363.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate379(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate379.errors
            : vErrors.concat(validate379.errors);
        errors = vErrors.length;
      }
    }
    if (data.storageos !== undefined) {
      if (
        !validate385(data.storageos, {
          instancePath: instancePath + '/storageos',
          parentData: data,
          parentDataProperty: 'storageos',
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
    if (data.vsphereVolume !== undefined) {
      if (
        !validate392(data.vsphereVolume, {
          instancePath: instancePath + '/vsphereVolume',
          parentData: data,
          parentDataProperty: 'vsphereVolume',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate392.errors
            : vErrors.concat(validate392.errors);
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
  validate153.errors = vErrors;
  return errors === 0;
}
function validate152(
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
        !validate153(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate153.errors
            : vErrors.concat(validate153.errors);
        errors = vErrors.length;
      }
    }
  }
  validate152.errors = vErrors;
  return errors === 0;
}
function validate132(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.targetJobs === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'targetJobs',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.containers !== undefined) {
      if (
        !validate59(data.containers, {
          instancePath: instancePath + '/containers',
          parentData: data,
          parentDataProperty: 'containers',
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
    if (data.initContainers !== undefined) {
      if (
        !validate59(data.initContainers, {
          instancePath: instancePath + '/initContainers',
          parentData: data,
          parentDataProperty: 'initContainers',
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
    if (data.nodeSelector !== undefined) {
      if (
        !validate57(data.nodeSelector, {
          instancePath: instancePath + '/nodeSelector',
          parentData: data,
          parentDataProperty: 'nodeSelector',
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
    if (data.schedulingGates !== undefined) {
      if (
        !validate136(data.schedulingGates, {
          instancePath: instancePath + '/schedulingGates',
          parentData: data,
          parentDataProperty: 'schedulingGates',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate136.errors
            : vErrors.concat(validate136.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountName !== undefined) {
      if (
        !validate22(data.serviceAccountName, {
          instancePath: instancePath + '/serviceAccountName',
          parentData: data,
          parentDataProperty: 'serviceAccountName',
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
    if (data.targetJobs !== undefined) {
      if (
        !validate140(data.targetJobs, {
          instancePath: instancePath + '/targetJobs',
          parentData: data,
          parentDataProperty: 'targetJobs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate140.errors
            : vErrors.concat(validate140.errors);
        errors = vErrors.length;
      }
    }
    if (data.tolerations !== undefined) {
      if (
        !validate143(data.tolerations, {
          instancePath: instancePath + '/tolerations',
          parentData: data,
          parentDataProperty: 'tolerations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate143.errors
            : vErrors.concat(validate143.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumes !== undefined) {
      if (
        !validate152(data.volumes, {
          instancePath: instancePath + '/volumes',
          parentData: data,
          parentDataProperty: 'volumes',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate152.errors
            : vErrors.concat(validate152.errors);
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
const schema106 = {
  properties: {
    apiGroup: {
      $ref: 'RJjc6Tkd3l3b6YJStIk3qGjxPGiXHb7FWfaWDenZaI',
    },
    kind: {
      $ref: 'L7MHTQ6KaTA4Qv8zmWnmWKFlfzfwhwSAGy36Mrdso',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['name'],
  type: 'object',
};
const schema107 = {
  default: 'trainer.kubeflow.org',
  type: 'string',
  nullable: true,
};
function validate403(
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
  validate403.errors = vErrors;
  return errors === 0;
}
const schema108 = {
  default: 'ClusterTrainingRuntime',
  type: 'string',
  nullable: true,
};
function validate405(
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
  validate405.errors = vErrors;
  return errors === 0;
}
function validate402(
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
    if (data.apiGroup !== undefined) {
      if (
        !validate403(data.apiGroup, {
          instancePath: instancePath + '/apiGroup',
          parentData: data,
          parentDataProperty: 'apiGroup',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate403.errors
            : vErrors.concat(validate403.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate405(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate405.errors
            : vErrors.concat(validate405.errors);
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
  validate402.errors = vErrors;
  return errors === 0;
}
const schema109 = {
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
    numNodes: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    numProcPerNode: {
      $ref: 'uJPY5JwdoQeyZsG50sBXB6uBQV8ScD7PtRRAnILoI3A',
    },
    resourcesPerNode: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
  },
  type: 'object',
  nullable: true,
};
const schema110 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
};
function validate416(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate43(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
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
  validate416.errors = vErrors;
  return errors === 0;
}
const schema111 = {
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
  type: 'object',
  nullable: true,
};
const schema112 = {
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  type: 'array',
  nullable: true,
};
const schema113 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    request: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['name'],
  type: 'object',
};
function validate422(
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
        !validate22(data.request, {
          instancePath: instancePath + '/request',
          parentData: data,
          parentDataProperty: 'request',
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
  validate422.errors = vErrors;
  return errors === 0;
}
function validate421(
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
        !validate422(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate422.errors
            : vErrors.concat(validate422.errors);
        errors = vErrors.length;
      }
    }
  }
  validate421.errors = vErrors;
  return errors === 0;
}
function validate420(
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
        !validate421(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate421.errors
            : vErrors.concat(validate421.errors);
        errors = vErrors.length;
      }
    }
    if (data.limits !== undefined) {
      if (
        !validate80(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate80(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate420.errors = vErrors;
  return errors === 0;
}
function validate410(
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
        !validate78(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate78(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.env !== undefined) {
      if (
        !validate30(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.image !== undefined) {
      if (
        !validate22(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.numNodes !== undefined) {
      if (
        !validate77(data.numNodes, {
          instancePath: instancePath + '/numNodes',
          parentData: data,
          parentDataProperty: 'numNodes',
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
    if (data.numProcPerNode !== undefined) {
      if (
        !validate416(data.numProcPerNode, {
          instancePath: instancePath + '/numProcPerNode',
          parentData: data,
          parentDataProperty: 'numProcPerNode',
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
    if (data.resourcesPerNode !== undefined) {
      if (
        !validate420(data.resourcesPerNode, {
          instancePath: instancePath + '/resourcesPerNode',
          parentData: data,
          parentDataProperty: 'resourcesPerNode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate420.errors
            : vErrors.concat(validate420.errors);
        errors = vErrors.length;
      }
    }
  }
  validate410.errors = vErrors;
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
    if (data.runtimeRef === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'runtimeRef',
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
        !validate57(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
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
    if (data.initializer !== undefined) {
      if (
        !validate124(data.initializer, {
          instancePath: instancePath + '/initializer',
          parentData: data,
          parentDataProperty: 'initializer',
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
    if (data.labels !== undefined) {
      if (
        !validate57(data.labels, {
          instancePath: instancePath + '/labels',
          parentData: data,
          parentDataProperty: 'labels',
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
    if (data.managedBy !== undefined) {
      if (
        !validate129(data.managedBy, {
          instancePath: instancePath + '/managedBy',
          parentData: data,
          parentDataProperty: 'managedBy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate129.errors
            : vErrors.concat(validate129.errors);
        errors = vErrors.length;
      }
    }
    if (data.podSpecOverrides !== undefined) {
      if (
        !validate131(data.podSpecOverrides, {
          instancePath: instancePath + '/podSpecOverrides',
          parentData: data,
          parentDataProperty: 'podSpecOverrides',
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
    if (data.runtimeRef !== undefined) {
      if (
        !validate402(data.runtimeRef, {
          instancePath: instancePath + '/runtimeRef',
          parentData: data,
          parentDataProperty: 'runtimeRef',
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
    if (data.suspend !== undefined) {
      if (
        !validate111(data.suspend, {
          instancePath: instancePath + '/suspend',
          parentData: data,
          parentDataProperty: 'suspend',
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
    if (data.trainer !== undefined) {
      if (
        !validate410(data.trainer, {
          instancePath: instancePath + '/trainer',
          parentData: data,
          parentDataProperty: 'trainer',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate410.errors
            : vErrors.concat(validate410.errors);
        errors = vErrors.length;
      }
    }
  }
  validate122.errors = vErrors;
  return errors === 0;
}
const schema114 = {
  properties: {
    conditions: {
      $ref: 'zBl6OiSXSxQ6tDeBlQ4suXy9oTADY8BgOSRVMsB44',
    },
    jobsStatus: {
      $ref: 'BNsMo5Wqh0xx7aFdZasPEyAKapYP7ah1cjCFRTmLg',
    },
  },
  type: 'object',
  nullable: true,
};
const schema115 = {
  items: {
    $ref: 'qF2xzAbTxVDKuLvsNu75Dkz2iJf8KcuXclF0tKipnn0',
  },
  type: 'array',
  nullable: true,
};
const schema116 = {
  properties: {
    lastTransitionTime: {
      $ref: 'KrhXBWKB1pK8JptMQRXbBg5co4bpZWZnIUkdeEo37wY',
    },
    message: {
      $ref: 'Kduwl8DcA0kMznK9kNMJ5ZDKDZL9GH04F46AbIesag',
    },
    observedGeneration: {
      $ref: 'Sg5VMnp9PeciTWOOocDxVZ8KL974mKlNPE7Z3LxfFY',
    },
    reason: {
      $ref: 'ffwvxWNmgAw4j3J98OozNWe0YovCdcCVbNeffpYY',
    },
    status: {
      $ref: 'pxfc6xQekz8UJRTLhQQLAy8qHcx9lW4EsDEEbdf5fxA',
    },
    type: {
      $ref: 'abwpMDY1BocHdDN72xQbiDERuNabmToRz3D0GKn0D4',
    },
  },
  required: ['lastTransitionTime', 'message', 'reason', 'status', 'type'],
  type: 'object',
};
const schema117 = {
  format: 'date-time',
  type: 'string',
};
const formats6 = formats['date-time'];
function validate435(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === 'string') {
    if (!formats6.validate(data)) {
      const err0 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'date-time',
        },
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
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate435.errors = vErrors;
  return errors === 0;
}
const schema118 = {
  maxLength: 32768,
  type: 'string',
};

import func2 from '@kubernetes-models/validate/runtime/ucs2length';

function validate437(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === 'string') {
    if (func2(data) > 32768) {
      const err0 = {
        instancePath,
        schemaPath: '#/maxLength',
        keyword: 'maxLength',
        params: {
          limit: 32768,
        },
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
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate437.errors = vErrors;
  return errors === 0;
}
const schema119 = {
  format: 'int64',
  type: 'integer',
  minimum: 0,
  nullable: true,
};
function validate439(
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
    if (data < 0 || isNaN(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/minimum',
        keyword: 'minimum',
        params: {
          comparison: '>=',
          limit: 0,
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!formats2.validate(data)) {
      const err2 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'int64',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  }
  validate439.errors = vErrors;
  return errors === 0;
}
const schema120 = {
  maxLength: 1024,
  minLength: 1,
  pattern: '^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$',
  type: 'string',
};
const pattern1 = /^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$/u;
function validate441(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === 'string') {
    if (func2(data) > 1024) {
      const err0 = {
        instancePath,
        schemaPath: '#/maxLength',
        keyword: 'maxLength',
        params: {
          limit: 1024,
        },
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
        schemaPath: '#/minLength',
        keyword: 'minLength',
        params: {
          limit: 1,
        },
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
        schemaPath: '#/pattern',
        keyword: 'pattern',
        params: {
          pattern: '^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$',
        },
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
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate441.errors = vErrors;
  return errors === 0;
}
const schema121 = {
  enum: ['True', 'False', 'Unknown'],
  type: 'string',
};
function validate443(
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
  if (!(data === 'True' || data === 'False' || data === 'Unknown')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema121.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate443.errors = vErrors;
  return errors === 0;
}
const schema122 = {
  maxLength: 316,
  pattern:
    '^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$',
  type: 'string',
};
const pattern2 =
  /^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*\/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$/u;
function validate445(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === 'string') {
    if (func2(data) > 316) {
      const err0 = {
        instancePath,
        schemaPath: '#/maxLength',
        keyword: 'maxLength',
        params: {
          limit: 316,
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (!pattern2.test(data)) {
      const err1 = {
        instancePath,
        schemaPath: '#/pattern',
        keyword: 'pattern',
        params: {
          pattern:
            '^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$',
        },
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
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'string',
      },
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate445.errors = vErrors;
  return errors === 0;
}
function validate434(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.lastTransitionTime === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'lastTransitionTime',
        },
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
    if (data.reason === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'reason',
        },
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
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'status',
        },
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
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'type',
        },
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.lastTransitionTime !== undefined) {
      if (
        !validate435(data.lastTransitionTime, {
          instancePath: instancePath + '/lastTransitionTime',
          parentData: data,
          parentDataProperty: 'lastTransitionTime',
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
    if (data.message !== undefined) {
      if (
        !validate437(data.message, {
          instancePath: instancePath + '/message',
          parentData: data,
          parentDataProperty: 'message',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate437.errors
            : vErrors.concat(validate437.errors);
        errors = vErrors.length;
      }
    }
    if (data.observedGeneration !== undefined) {
      if (
        !validate439(data.observedGeneration, {
          instancePath: instancePath + '/observedGeneration',
          parentData: data,
          parentDataProperty: 'observedGeneration',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate439.errors
            : vErrors.concat(validate439.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== undefined) {
      if (
        !validate441(data.reason, {
          instancePath: instancePath + '/reason',
          parentData: data,
          parentDataProperty: 'reason',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate441.errors
            : vErrors.concat(validate441.errors);
        errors = vErrors.length;
      }
    }
    if (data.status !== undefined) {
      if (
        !validate443(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate443.errors
            : vErrors.concat(validate443.errors);
        errors = vErrors.length;
      }
    }
    if (data.type !== undefined) {
      if (
        !validate445(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate445.errors
            : vErrors.concat(validate445.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err5 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate434.errors = vErrors;
  return errors === 0;
}
function validate433(
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
        !validate434(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate433.errors = vErrors;
  return errors === 0;
}
const schema123 = {
  items: {
    $ref: 'n75MQbGs0fUFhnAAYBYz4xmnRfWYWsX6OadHFbEaOJI',
  },
  type: 'array',
  nullable: true,
};
const schema124 = {
  properties: {
    active: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    failed: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    ready: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    succeeded: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    suspended: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
  },
  required: ['active', 'failed', 'name', 'ready', 'succeeded', 'suspended'],
  type: 'object',
};
function validate450(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.active === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'active',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.failed === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'failed',
        },
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
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'name',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.ready === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'ready',
        },
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.succeeded === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'succeeded',
        },
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.suspended === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'suspended',
        },
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.active !== undefined) {
      if (
        !validate112(data.active, {
          instancePath: instancePath + '/active',
          parentData: data,
          parentDataProperty: 'active',
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
    if (data.failed !== undefined) {
      if (
        !validate112(data.failed, {
          instancePath: instancePath + '/failed',
          parentData: data,
          parentDataProperty: 'failed',
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
    if (data.ready !== undefined) {
      if (
        !validate112(data.ready, {
          instancePath: instancePath + '/ready',
          parentData: data,
          parentDataProperty: 'ready',
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
    if (data.succeeded !== undefined) {
      if (
        !validate112(data.succeeded, {
          instancePath: instancePath + '/succeeded',
          parentData: data,
          parentDataProperty: 'succeeded',
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
    if (data.suspended !== undefined) {
      if (
        !validate112(data.suspended, {
          instancePath: instancePath + '/suspended',
          parentData: data,
          parentDataProperty: 'suspended',
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
  } else {
    const err6 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: {
        type: 'object',
      },
    };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
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
function validate432(
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
    if (data.conditions !== undefined) {
      if (
        !validate433(data.conditions, {
          instancePath: instancePath + '/conditions',
          parentData: data,
          parentDataProperty: 'conditions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate433.errors
            : vErrors.concat(validate433.errors);
        errors = vErrors.length;
      }
    }
    if (data.jobsStatus !== undefined) {
      if (
        !validate449(data.jobsStatus, {
          instancePath: instancePath + '/jobsStatus',
          parentData: data,
          parentDataProperty: 'jobsStatus',
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
  }
  validate432.errors = vErrors;
  return errors === 0;
}
function validate113(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="trainer.kubeflow.org.v1alpha1.TrainJob" */
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
        !validate114(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.kind !== undefined) {
      if (
        !validate116(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate116.errors
            : vErrors.concat(validate116.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate118(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate118.errors
            : vErrors.concat(validate118.errors);
        errors = vErrors.length;
      }
    }
    if (data.spec !== undefined) {
      if (
        !validate122(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
    if (data.status !== undefined) {
      if (
        !validate432(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate432.errors
            : vErrors.concat(validate432.errors);
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
  validate113.errors = vErrors;
  return errors === 0;
}
