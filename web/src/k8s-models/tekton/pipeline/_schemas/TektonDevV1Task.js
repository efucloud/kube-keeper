import { formats } from '@kubernetes-models/validate';
export const validate = validate178;
const schema57 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'wgZDK9uwuXoeAzLqnWqrq0y9h754fMvBk39QXQsdw',
    },
    kind: {
      $ref: 'G8u8v50bd06X6eICMi2Xt1wxKizLx90dGT5Xu8o',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'WW8fZeWFbLBQYVybHx3amtn5HUGX9owZqOEduBel35w',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1.Task',
};
const schema58 = {
  type: 'string',
  enum: ['tekton.dev/v1'],
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
  if (!(data === 'tekton.dev/v1')) {
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
  validate179.errors = vErrors;
  return errors === 0;
}
const schema59 = {
  type: 'string',
  enum: ['Task'],
};
function validate181(
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
  if (!(data === 'Task')) {
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
  validate181.errors = vErrors;
  return errors === 0;
}
const schema60 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema61 = {};

import { validate as validate184 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate183(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate184(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate184.errors
          : vErrors.concat(validate184.errors);
      errors = vErrors.length;
    }
  }
  validate183.errors = vErrors;
  return errors === 0;
}
const schema62 = {
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
const schema63 = {
  type: 'array',
  items: {
    $ref: 'CubDNCGD0a691SjxZVe1ELttRW6Lby7ZJEo4gOU',
  },
  nullable: true,
};
const schema64 = {
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
const schema10 = {};
function validate27(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  validate27.errors = null;
  return true;
}
const schema11 = {
  type: 'array',
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
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
function validate28(
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
  validate28.errors = vErrors;
  return errors === 0;
}
const schema8 = {
  type: 'object',
  additionalProperties: {
    $ref: '12bGl5SorwtEAV7svcAR515UJ3gXm6T8AH6G7ywQ',
  },
  properties: {},
  nullable: true,
};
const schema9 = {
  type: 'object',
  properties: {
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate24(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
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
  validate24.errors = vErrors;
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
  validate23.errors = vErrors;
  return errors === 0;
}
function validate190(
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
        !validate27(data.default, {
          instancePath: instancePath + '/default',
          parentData: data,
          parentDataProperty: 'default',
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
    if (data.enum !== undefined) {
      if (
        !validate28(data.enum, {
          instancePath: instancePath + '/enum',
          parentData: data,
          parentDataProperty: 'enum',
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
    if (data.properties !== undefined) {
      if (
        !validate23(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate190.errors = vErrors;
  return errors === 0;
}
function validate189(
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
        !validate190(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate190.errors
            : vErrors.concat(validate190.errors);
        errors = vErrors.length;
      }
    }
  }
  validate189.errors = vErrors;
  return errors === 0;
}
const schema65 = {
  type: 'array',
  items: {
    $ref: 'hBY6GaZx5G5HDPyn3hkp3puoD4fe3eq9LyDov9b2dk',
  },
  nullable: true,
};
const schema66 = {
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
function validate199(
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
        !validate23(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
    if (data.value !== undefined) {
      if (
        !validate27(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate199.errors = vErrors;
  return errors === 0;
}
function validate198(
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
        !validate199(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate198.errors = vErrors;
  return errors === 0;
}
const schema67 = {
  type: 'array',
  items: {
    $ref: 'LEXjt556gj6TSN38pzq0NjjwwNJXEeVNfY8MfrxNo',
  },
  nullable: true,
};
const schema68 = {
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
const schema34 = {
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
const schema35 = {
  type: 'array',
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  nullable: true,
};
const schema36 = {
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
function validate94(
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
const schema12 = {
  type: 'object',
  additionalProperties: {
    $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
  },
  properties: {},
  nullable: true,
};
const schema13 = {
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
const schema14 = {
  type: 'integer',
};
function validate32(
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
  validate32.errors = vErrors;
  return errors === 0;
}
const pattern0 =
  /^(\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))(([KMGTPE]i)|[numkMGTPE]|([eE](\+|-)?(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))))?$/u;
function validate31(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate32(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
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
  validate31.errors = vErrors;
  return errors === 0;
}
function validate30(
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
        !validate31(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
function validate92(
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
        !validate93(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate30(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate30(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate92.errors = vErrors;
  return errors === 0;
}
const schema37 = {
  type: 'array',
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  nullable: true,
};
const schema38 = {
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
const schema39 = {
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
const schema15 = {
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
const schema16 = {
  type: 'string',
  default: '',
  nullable: true,
};
function validate38(
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
  validate38.errors = vErrors;
  return errors === 0;
}
const schema17 = {
  type: 'boolean',
  nullable: true,
};
function validate40(
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
  validate40.errors = vErrors;
  return errors === 0;
}
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
        !validate38(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate40(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate36.errors = vErrors;
  return errors === 0;
}
const schema40 = {
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
  validate107.errors = vErrors;
  return errors === 0;
}
const schema41 = {
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
function validate111(
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
        !validate31(data.divisor, {
          instancePath: instancePath + '/divisor',
          parentData: data,
          parentDataProperty: 'divisor',
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
  validate111.errors = vErrors;
  return errors === 0;
}
function validate105(
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
        !validate36(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
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
    if (data.fieldRef !== undefined) {
      if (
        !validate107(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate111(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
    if (data.secretKeyRef !== undefined) {
      if (
        !validate36(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
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
  }
  validate105.errors = vErrors;
  return errors === 0;
}
function validate102(
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
        !validate105(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate105.errors
            : vErrors.concat(validate105.errors);
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
  validate102.errors = vErrors;
  return errors === 0;
}
function validate101(
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
        !validate102(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate101.errors = vErrors;
  return errors === 0;
}
const schema42 = {
  type: 'array',
  items: {
    $ref: 'kFpnHd2NZ4UZDP4b3m62HC4SlJSOSeKF9pyuy1Pa7OM',
  },
  nullable: true,
};
const schema43 = {
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
const schema18 = {
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
function validate42(
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
        !validate38(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate40(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate42.errors = vErrors;
  return errors === 0;
}
function validate120(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.configMapRef !== undefined) {
      if (
        !validate42(data.configMapRef, {
          instancePath: instancePath + '/configMapRef',
          parentData: data,
          parentDataProperty: 'configMapRef',
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
    if (data.prefix !== undefined) {
      if (
        !validate22(data.prefix, {
          instancePath: instancePath + '/prefix',
          parentData: data,
          parentDataProperty: 'prefix',
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
        !validate42(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
const schema69 = {
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
const schema20 = {
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
const schema21 = {
  type: 'object',
  properties: {
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  nullable: true,
};
function validate49(
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
        !validate28(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
  validate49.errors = vErrors;
  return errors === 0;
}
const schema22 = {
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
const schema23 = {
  type: 'array',
  items: {
    $ref: 'RI8VVk8l4SnLWK7FbWs0RBoAVoSBUKkroMUjUfsI',
  },
  nullable: true,
};
const schema24 = {
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
const schema19 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
};
function validate45(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (
    !validate32(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
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
  validate45.errors = vErrors;
  return errors === 0;
}
function validate52(
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
        !validate22(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.httpHeaders !== undefined) {
      if (
        !validate54(data.httpHeaders, {
          instancePath: instancePath + '/httpHeaders',
          parentData: data,
          parentDataProperty: 'httpHeaders',
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
    if (data.port !== undefined) {
      if (
        !validate45(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
    if (data.scheme !== undefined) {
      if (
        !validate22(data.scheme, {
          instancePath: instancePath + '/scheme',
          parentData: data,
          parentDataProperty: 'scheme',
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
  validate52.errors = vErrors;
  return errors === 0;
}
const schema25 = {
  type: 'object',
  required: ['seconds'],
  properties: {
    seconds: {
      $ref: 'icwF9bpzvIS3QxC52v2XvqrjjaZnFwyMbHUnptLeEQ',
    },
  },
  nullable: true,
};
const schema26 = {
  type: 'integer',
  format: 'int64',
};
const formats0 = formats.int64;
function validate65(
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
  validate65.errors = vErrors;
  return errors === 0;
}
function validate64(
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
        !validate65(data.seconds, {
          instancePath: instancePath + '/seconds',
          parentData: data,
          parentDataProperty: 'seconds',
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
const schema27 = {
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
function validate68(
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
        !validate22(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.port !== undefined) {
      if (
        !validate45(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
  }
  validate68.errors = vErrors;
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
    if (data.exec !== undefined) {
      if (
        !validate49(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
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
    if (data.httpGet !== undefined) {
      if (
        !validate52(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.sleep !== undefined) {
      if (
        !validate64(data.sleep, {
          instancePath: instancePath + '/sleep',
          parentData: data,
          parentDataProperty: 'sleep',
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
    if (data.tcpSocket !== undefined) {
      if (
        !validate68(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate68.errors
            : vErrors.concat(validate68.errors);
        errors = vErrors.length;
      }
    }
  }
  validate48.errors = vErrors;
  return errors === 0;
}
function validate215(
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
        !validate48(data.postStart, {
          instancePath: instancePath + '/postStart',
          parentData: data,
          parentDataProperty: 'postStart',
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
    if (data.preStop !== undefined) {
      if (
        !validate48(data.preStop, {
          instancePath: instancePath + '/preStop',
          parentData: data,
          parentDataProperty: 'preStop',
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
  }
  validate215.errors = vErrors;
  return errors === 0;
}
const schema30 = {
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
const schema28 = {
  type: 'integer',
  format: 'int32',
  nullable: true,
};
const formats2 = formats.int32;
function validate72(
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
  validate72.errors = vErrors;
  return errors === 0;
}
const schema31 = {
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
const schema29 = {
  type: 'integer',
  format: 'int32',
};
function validate73(
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
  validate73.errors = vErrors;
  return errors === 0;
}
function validate77(
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
        !validate73(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
    if (data.service !== undefined) {
      if (
        !validate38(data.service, {
          instancePath: instancePath + '/service',
          parentData: data,
          parentDataProperty: 'service',
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
  validate77.errors = vErrors;
  return errors === 0;
}
const schema32 = {
  type: 'integer',
  format: 'int64',
  nullable: true,
};
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
  validate86.errors = vErrors;
  return errors === 0;
}
function validate74(
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
        !validate49(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
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
    if (data.failureThreshold !== undefined) {
      if (
        !validate72(data.failureThreshold, {
          instancePath: instancePath + '/failureThreshold',
          parentData: data,
          parentDataProperty: 'failureThreshold',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
    if (data.grpc !== undefined) {
      if (
        !validate77(data.grpc, {
          instancePath: instancePath + '/grpc',
          parentData: data,
          parentDataProperty: 'grpc',
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
    if (data.httpGet !== undefined) {
      if (
        !validate52(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.initialDelaySeconds !== undefined) {
      if (
        !validate72(data.initialDelaySeconds, {
          instancePath: instancePath + '/initialDelaySeconds',
          parentData: data,
          parentDataProperty: 'initialDelaySeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
    if (data.periodSeconds !== undefined) {
      if (
        !validate72(data.periodSeconds, {
          instancePath: instancePath + '/periodSeconds',
          parentData: data,
          parentDataProperty: 'periodSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
    if (data.successThreshold !== undefined) {
      if (
        !validate72(data.successThreshold, {
          instancePath: instancePath + '/successThreshold',
          parentData: data,
          parentDataProperty: 'successThreshold',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
    if (data.tcpSocket !== undefined) {
      if (
        !validate68(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate68.errors
            : vErrors.concat(validate68.errors);
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
        !validate72(data.timeoutSeconds, {
          instancePath: instancePath + '/timeoutSeconds',
          parentData: data,
          parentDataProperty: 'timeoutSeconds',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
        errors = vErrors.length;
      }
    }
  }
  validate74.errors = vErrors;
  return errors === 0;
}
const schema70 = {
  type: 'array',
  items: {
    $ref: 'WxMipWUqqSfo29Ftt21K0qdNOM8gEudjMjxXtvA',
  },
  nullable: true,
};
const schema71 = {
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
const schema72 = {
  type: 'string',
  default: 'TCP',
  nullable: true,
};
function validate227(
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
  validate227.errors = vErrors;
  return errors === 0;
}
function validate222(
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
        !validate73(data.containerPort, {
          instancePath: instancePath + '/containerPort',
          parentData: data,
          parentDataProperty: 'containerPort',
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
    if (data.hostIP !== undefined) {
      if (
        !validate22(data.hostIP, {
          instancePath: instancePath + '/hostIP',
          parentData: data,
          parentDataProperty: 'hostIP',
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
    if (data.hostPort !== undefined) {
      if (
        !validate72(data.hostPort, {
          instancePath: instancePath + '/hostPort',
          parentData: data,
          parentDataProperty: 'hostPort',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate72.errors
            : vErrors.concat(validate72.errors);
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
    if (data.protocol !== undefined) {
      if (
        !validate227(data.protocol, {
          instancePath: instancePath + '/protocol',
          parentData: data,
          parentDataProperty: 'protocol',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate227.errors
            : vErrors.concat(validate227.errors);
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
  validate222.errors = vErrors;
  return errors === 0;
}
function validate221(
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
        !validate222(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate221.errors = vErrors;
  return errors === 0;
}
const schema44 = {
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
const schema33 = {
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
function validate89(
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
        !validate22(data.localhostProfile, {
          instancePath: instancePath + '/localhostProfile',
          parentData: data,
          parentDataProperty: 'localhostProfile',
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
  validate89.errors = vErrors;
  return errors === 0;
}
const schema45 = {
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
function validate128(
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
        !validate28(data.add, {
          instancePath: instancePath + '/add',
          parentData: data,
          parentDataProperty: 'add',
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
    if (data.drop !== undefined) {
      if (
        !validate28(data.drop, {
          instancePath: instancePath + '/drop',
          parentData: data,
          parentDataProperty: 'drop',
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
  validate128.errors = vErrors;
  return errors === 0;
}
const schema46 = {
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
function validate138(
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
        !validate22(data.level, {
          instancePath: instancePath + '/level',
          parentData: data,
          parentDataProperty: 'level',
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
    if (data.role !== undefined) {
      if (
        !validate22(data.role, {
          instancePath: instancePath + '/role',
          parentData: data,
          parentDataProperty: 'role',
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
  validate138.errors = vErrors;
  return errors === 0;
}
const schema47 = {
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
function validate145(
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
        !validate22(data.gmsaCredentialSpec, {
          instancePath: instancePath + '/gmsaCredentialSpec',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpec',
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
    if (data.gmsaCredentialSpecName !== undefined) {
      if (
        !validate22(data.gmsaCredentialSpecName, {
          instancePath: instancePath + '/gmsaCredentialSpecName',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpecName',
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
    if (data.hostProcess !== undefined) {
      if (
        !validate40(data.hostProcess, {
          instancePath: instancePath + '/hostProcess',
          parentData: data,
          parentDataProperty: 'hostProcess',
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
    if (data.runAsUserName !== undefined) {
      if (
        !validate22(data.runAsUserName, {
          instancePath: instancePath + '/runAsUserName',
          parentData: data,
          parentDataProperty: 'runAsUserName',
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
  validate145.errors = vErrors;
  return errors === 0;
}
function validate125(
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
        !validate40(data.allowPrivilegeEscalation, {
          instancePath: instancePath + '/allowPrivilegeEscalation',
          parentData: data,
          parentDataProperty: 'allowPrivilegeEscalation',
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
    if (data.appArmorProfile !== undefined) {
      if (
        !validate89(data.appArmorProfile, {
          instancePath: instancePath + '/appArmorProfile',
          parentData: data,
          parentDataProperty: 'appArmorProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate89.errors
            : vErrors.concat(validate89.errors);
        errors = vErrors.length;
      }
    }
    if (data.capabilities !== undefined) {
      if (
        !validate128(data.capabilities, {
          instancePath: instancePath + '/capabilities',
          parentData: data,
          parentDataProperty: 'capabilities',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate128.errors
            : vErrors.concat(validate128.errors);
        errors = vErrors.length;
      }
    }
    if (data.privileged !== undefined) {
      if (
        !validate40(data.privileged, {
          instancePath: instancePath + '/privileged',
          parentData: data,
          parentDataProperty: 'privileged',
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
    if (data.procMount !== undefined) {
      if (
        !validate22(data.procMount, {
          instancePath: instancePath + '/procMount',
          parentData: data,
          parentDataProperty: 'procMount',
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
    if (data.readOnlyRootFilesystem !== undefined) {
      if (
        !validate40(data.readOnlyRootFilesystem, {
          instancePath: instancePath + '/readOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'readOnlyRootFilesystem',
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
        !validate40(data.runAsNonRoot, {
          instancePath: instancePath + '/runAsNonRoot',
          parentData: data,
          parentDataProperty: 'runAsNonRoot',
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
        !validate138(data.seLinuxOptions, {
          instancePath: instancePath + '/seLinuxOptions',
          parentData: data,
          parentDataProperty: 'seLinuxOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate138.errors
            : vErrors.concat(validate138.errors);
        errors = vErrors.length;
      }
    }
    if (data.seccompProfile !== undefined) {
      if (
        !validate89(data.seccompProfile, {
          instancePath: instancePath + '/seccompProfile',
          parentData: data,
          parentDataProperty: 'seccompProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate89.errors
            : vErrors.concat(validate89.errors);
        errors = vErrors.length;
      }
    }
    if (data.windowsOptions !== undefined) {
      if (
        !validate145(data.windowsOptions, {
          instancePath: instancePath + '/windowsOptions',
          parentData: data,
          parentDataProperty: 'windowsOptions',
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
  validate125.errors = vErrors;
  return errors === 0;
}
const schema48 = {
  type: 'array',
  items: {
    $ref: 'RyMynCzjYAPHCEQqWFiO4dTDXuIMC11XbOjI4iorY',
  },
  nullable: true,
};
const schema49 = {
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
function validate152(
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
  validate152.errors = vErrors;
  return errors === 0;
}
function validate151(
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
        !validate152(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate151.errors = vErrors;
  return errors === 0;
}
const schema50 = {
  type: 'array',
  items: {
    $ref: 'SEp18EkqjgXWMJk6uDMmapPUotqVJbrnxhdiX2GuEY',
  },
  nullable: true,
};
const schema51 = {
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
function validate157(
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
        !validate40(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate157.errors = vErrors;
  return errors === 0;
}
function validate156(
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
        !validate157(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate156.errors = vErrors;
  return errors === 0;
}
const schema55 = {
  type: 'array',
  items: {
    $ref: '2OivYcN4Pa7vgEbhxGmdWJz9YYIax6baoWV5qvc',
  },
  nullable: true,
};
const schema56 = {
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
function validate174(
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
  validate174.errors = vErrors;
  return errors === 0;
}
function validate173(
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
        !validate174(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate173.errors = vErrors;
  return errors === 0;
}
function validate207(
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
        !validate28(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate28(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate92(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate101(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.envFrom !== undefined) {
      if (
        !validate119(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate22(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.lifecycle !== undefined) {
      if (
        !validate215(data.lifecycle, {
          instancePath: instancePath + '/lifecycle',
          parentData: data,
          parentDataProperty: 'lifecycle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate215.errors
            : vErrors.concat(validate215.errors);
        errors = vErrors.length;
      }
    }
    if (data.livenessProbe !== undefined) {
      if (
        !validate74(data.livenessProbe, {
          instancePath: instancePath + '/livenessProbe',
          parentData: data,
          parentDataProperty: 'livenessProbe',
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
        !validate221(data.ports, {
          instancePath: instancePath + '/ports',
          parentData: data,
          parentDataProperty: 'ports',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate221.errors
            : vErrors.concat(validate221.errors);
        errors = vErrors.length;
      }
    }
    if (data.readinessProbe !== undefined) {
      if (
        !validate74(data.readinessProbe, {
          instancePath: instancePath + '/readinessProbe',
          parentData: data,
          parentDataProperty: 'readinessProbe',
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
    if (data.restartPolicy !== undefined) {
      if (
        !validate22(data.restartPolicy, {
          instancePath: instancePath + '/restartPolicy',
          parentData: data,
          parentDataProperty: 'restartPolicy',
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
    if (data.script !== undefined) {
      if (
        !validate22(data.script, {
          instancePath: instancePath + '/script',
          parentData: data,
          parentDataProperty: 'script',
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
    if (data.securityContext !== undefined) {
      if (
        !validate125(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate125.errors
            : vErrors.concat(validate125.errors);
        errors = vErrors.length;
      }
    }
    if (data.startupProbe !== undefined) {
      if (
        !validate74(data.startupProbe, {
          instancePath: instancePath + '/startupProbe',
          parentData: data,
          parentDataProperty: 'startupProbe',
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
    if (data.stdin !== undefined) {
      if (
        !validate40(data.stdin, {
          instancePath: instancePath + '/stdin',
          parentData: data,
          parentDataProperty: 'stdin',
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
    if (data.stdinOnce !== undefined) {
      if (
        !validate40(data.stdinOnce, {
          instancePath: instancePath + '/stdinOnce',
          parentData: data,
          parentDataProperty: 'stdinOnce',
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
    if (data.terminationMessagePath !== undefined) {
      if (
        !validate22(data.terminationMessagePath, {
          instancePath: instancePath + '/terminationMessagePath',
          parentData: data,
          parentDataProperty: 'terminationMessagePath',
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
    if (data.terminationMessagePolicy !== undefined) {
      if (
        !validate22(data.terminationMessagePolicy, {
          instancePath: instancePath + '/terminationMessagePolicy',
          parentData: data,
          parentDataProperty: 'terminationMessagePolicy',
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
    if (data.tty !== undefined) {
      if (
        !validate40(data.tty, {
          instancePath: instancePath + '/tty',
          parentData: data,
          parentDataProperty: 'tty',
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate151(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate156(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
    if (data.workingDir !== undefined) {
      if (
        !validate22(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
    if (data.workspaces !== undefined) {
      if (
        !validate173(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  validate207.errors = vErrors;
  return errors === 0;
}
function validate206(
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
        !validate207(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate207.errors
            : vErrors.concat(validate207.errors);
        errors = vErrors.length;
      }
    }
  }
  validate206.errors = vErrors;
  return errors === 0;
}
const schema73 = {
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
function validate247(
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
        !validate28(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate28(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate92(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate101(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.envFrom !== undefined) {
      if (
        !validate119(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate22(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.securityContext !== undefined) {
      if (
        !validate125(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate125.errors
            : vErrors.concat(validate125.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumeDevices !== undefined) {
      if (
        !validate151(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate156(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
    if (data.workingDir !== undefined) {
      if (
        !validate22(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
  validate247.errors = vErrors;
  return errors === 0;
}
const schema74 = {
  type: 'array',
  items: {
    $ref: 'I4wwQEM5iKk9BkpITG4IcZMZgGeLI4Io8LS0sRgu1is',
  },
  nullable: true,
};
const schema75 = {
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
const schema52 = {
  type: 'array',
  items: {
    $ref: '9Io3ghMpg6A5V9ui8mWOQtmsEyRmTdvNEMe6HPIU',
  },
  nullable: true,
};
const schema53 = {
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
function validate167(
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
        !validate27(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate167.errors = vErrors;
  return errors === 0;
}
function validate166(
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
        !validate167(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate166.errors = vErrors;
  return errors === 0;
}
const schema76 = {
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
    if (data.params !== undefined) {
      if (
        !validate166(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate166.errors
            : vErrors.concat(validate166.errors);
        errors = vErrors.length;
      }
    }
    if (data.resolver !== undefined) {
      if (
        !validate22(data.resolver, {
          instancePath: instancePath + '/resolver',
          parentData: data,
          parentDataProperty: 'resolver',
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
  validate272.errors = vErrors;
  return errors === 0;
}
const schema77 = {
  type: 'array',
  items: {
    $ref: 'QmNiMvHAKpVlhCzW7RrhzkIVmJq1SAWW3tht7K95I',
  },
  nullable: true,
};
const schema78 = {
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
function validate278(
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
        !validate23(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate278.errors = vErrors;
  return errors === 0;
}
function validate277(
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
        !validate278(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate277.errors = vErrors;
  return errors === 0;
}
const schema54 = {
  type: 'object',
  properties: {
    path: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  nullable: true,
};
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
  }
  validate171.errors = vErrors;
  return errors === 0;
}
const schema79 = {
  type: 'array',
  items: {
    $ref: '3gytCkvMwLExpL6MGpbNjXP74frkSgUMMmU0dalCk',
  },
  nullable: true,
};
const schema80 = {
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
function validate292(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.cel !== undefined) {
      if (
        !validate22(data.cel, {
          instancePath: instancePath + '/cel',
          parentData: data,
          parentDataProperty: 'cel',
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
    if (data.input !== undefined) {
      if (
        !validate22(data.input, {
          instancePath: instancePath + '/input',
          parentData: data,
          parentDataProperty: 'input',
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
    if (data.values !== undefined) {
      if (
        !validate28(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate292.errors = vErrors;
  return errors === 0;
}
function validate291(
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
        !validate292(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate292.errors
            : vErrors.concat(validate292.errors);
        errors = vErrors.length;
      }
    }
  }
  validate291.errors = vErrors;
  return errors === 0;
}
function validate261(
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
        !validate28(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate28(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
    if (data.computeResources !== undefined) {
      if (
        !validate92(data.computeResources, {
          instancePath: instancePath + '/computeResources',
          parentData: data,
          parentDataProperty: 'computeResources',
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
    if (data.env !== undefined) {
      if (
        !validate101(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.envFrom !== undefined) {
      if (
        !validate119(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate22(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.onError !== undefined) {
      if (
        !validate22(data.onError, {
          instancePath: instancePath + '/onError',
          parentData: data,
          parentDataProperty: 'onError',
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
    if (data.params !== undefined) {
      if (
        !validate166(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate166.errors
            : vErrors.concat(validate166.errors);
        errors = vErrors.length;
      }
    }
    if (data.ref !== undefined) {
      if (
        !validate272(data.ref, {
          instancePath: instancePath + '/ref',
          parentData: data,
          parentDataProperty: 'ref',
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
    if (data.results !== undefined) {
      if (
        !validate277(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
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
    if (data.script !== undefined) {
      if (
        !validate22(data.script, {
          instancePath: instancePath + '/script',
          parentData: data,
          parentDataProperty: 'script',
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
    if (data.securityContext !== undefined) {
      if (
        !validate125(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate125.errors
            : vErrors.concat(validate125.errors);
        errors = vErrors.length;
      }
    }
    if (data.stderrConfig !== undefined) {
      if (
        !validate171(data.stderrConfig, {
          instancePath: instancePath + '/stderrConfig',
          parentData: data,
          parentDataProperty: 'stderrConfig',
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
    if (data.stdoutConfig !== undefined) {
      if (
        !validate171(data.stdoutConfig, {
          instancePath: instancePath + '/stdoutConfig',
          parentData: data,
          parentDataProperty: 'stdoutConfig',
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
    if (data.timeout !== undefined) {
      if (
        !validate22(data.timeout, {
          instancePath: instancePath + '/timeout',
          parentData: data,
          parentDataProperty: 'timeout',
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate151(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate156(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
    if (data.when !== undefined) {
      if (
        !validate291(data.when, {
          instancePath: instancePath + '/when',
          parentData: data,
          parentDataProperty: 'when',
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
    if (data.workingDir !== undefined) {
      if (
        !validate22(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
    if (data.workspaces !== undefined) {
      if (
        !validate173(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  validate261.errors = vErrors;
  return errors === 0;
}
function validate260(
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
        !validate261(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate260.errors = vErrors;
  return errors === 0;
}
const schema81 = {
  type: 'array',
  items: {
    $ref: 'sPikpQ5fROCOc32uo1z3nO4gsZ0t7zppWGi1oJzrAU',
  },
  nullable: true,
};
const schema82 = {
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
function validate305(
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
        !validate40(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.readOnly !== undefined) {
      if (
        !validate40(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
function validate187(
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
        !validate22(data.displayName, {
          instancePath: instancePath + '/displayName',
          parentData: data,
          parentDataProperty: 'displayName',
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
    if (data.params !== undefined) {
      if (
        !validate189(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate189.errors
            : vErrors.concat(validate189.errors);
        errors = vErrors.length;
      }
    }
    if (data.results !== undefined) {
      if (
        !validate198(data.results, {
          instancePath: instancePath + '/results',
          parentData: data,
          parentDataProperty: 'results',
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
    if (data.sidecars !== undefined) {
      if (
        !validate206(data.sidecars, {
          instancePath: instancePath + '/sidecars',
          parentData: data,
          parentDataProperty: 'sidecars',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate206.errors
            : vErrors.concat(validate206.errors);
        errors = vErrors.length;
      }
    }
    if (data.stepTemplate !== undefined) {
      if (
        !validate247(data.stepTemplate, {
          instancePath: instancePath + '/stepTemplate',
          parentData: data,
          parentDataProperty: 'stepTemplate',
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
    if (data.steps !== undefined) {
      if (
        !validate260(data.steps, {
          instancePath: instancePath + '/steps',
          parentData: data,
          parentDataProperty: 'steps',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate260.errors
            : vErrors.concat(validate260.errors);
        errors = vErrors.length;
      }
    }
    if (data.volumes !== undefined) {
      if (
        !validate27(data.volumes, {
          instancePath: instancePath + '/volumes',
          parentData: data,
          parentDataProperty: 'volumes',
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
    if (data.workspaces !== undefined) {
      if (
        !validate304(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  }
  validate187.errors = vErrors;
  return errors === 0;
}
function validate178(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1.Task" */
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
        !validate179(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.kind !== undefined) {
      if (
        !validate181(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
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
    if (data.metadata !== undefined) {
      if (
        !validate183(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate187(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate187.errors
            : vErrors.concat(validate187.errors);
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
  validate178.errors = vErrors;
  return errors === 0;
}
