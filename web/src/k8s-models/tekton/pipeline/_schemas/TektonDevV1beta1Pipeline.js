export const validate = validate99;
const schema30 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: '7H7QTLHWjsW4ORrCnkHX3WahQAZYEwSG5D7kdY2U',
    },
    kind: {
      $ref: 'jaTyJo6ovMMs2SceOFobSoSbfkZP5fCK2whw5dvJOcM',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'pkhE27iEqgvmFQ1BYXIU3zofrxbjFVGMpRM5pclRWg',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'tekton.dev.v1beta1.Pipeline',
};
const schema31 = {
  type: 'string',
  enum: ['tekton.dev/v1beta1'],
};
function validate100(
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
        allowedValues: schema31.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate100.errors = vErrors;
  return errors === 0;
}
const schema32 = {
  type: 'string',
  enum: ['Pipeline'],
};
function validate102(
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
  if (!(data === 'Pipeline')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema32.enum,
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
const schema33 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema34 = {};

import { validate as validate105 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate104(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate105(data, {
        instancePath,
        parentData,
        parentDataProperty,
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
  validate104.errors = vErrors;
  return errors === 0;
}
const schema35 = {
  type: 'object',
  properties: {
    displayName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    finally: {
      $ref: '2kJcV34iBRKcyk6NPKwD7iD6G88KuxdmER0aOFfh96M',
    },
    params: {
      $ref: 'MsDfZiS2fo9sPJDPqOjQKErAOp9nZCZ3K5fk3DRqIA',
    },
    resources: {
      $ref: 'pyu4QAELRIOHjAnd6aT8d0mBZC6s7GYlrObI26kyr4',
    },
    results: {
      $ref: 'LgAFLyqYQzBTuzhZMRq8N81uDZDX1YRxwqwfG6adGk',
    },
    tasks: {
      $ref: '2kJcV34iBRKcyk6NPKwD7iD6G88KuxdmER0aOFfh96M',
    },
    workspaces: {
      $ref: 'ZvaZ7e2hr0sKfg5qJzpN4GbTI3WmzhscRTMeIQ8Xgik',
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
const schema12 = {
  type: 'array',
  items: {
    $ref: 'J9t4qCuEyddovwi2ZctzHDK9ZQf82f5nBVGFZ6kfIyc',
  },
  nullable: true,
};
const schema13 = {
  type: 'object',
  properties: {
    displayName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    matrix: {
      $ref: 'KBHNOYAZGAj6BpFc8rXoguxSaAV5hGrP6THAqDgxlo8',
    },
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    onError: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
    pipelineRef: {
      $ref: 'HJFtsUdexNqNsLPOWxo67Us9qXsOM10072hmQ2CJB44',
    },
    pipelineSpec: {
      $ref: 'PV5SIH4Pb4Rd3cOKB0TmpocWXJ4M8i9zrFifAtVgtUQ',
    },
    resources: {
      $ref: 'GKSV3325svbBcc5rBqAnndi9corqVqXYSzh2rjrM',
    },
    retries: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    runAfter: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
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
    when: {
      $ref: 'K2jFzIlzvsHrdJrlU7ViVjY6dhLP4wG3VXFMAwf9U',
    },
    workspaces: {
      $ref: 'mEtxJlAkWAd68WgHYYLmfBfAyFHAXntCrTWLHkfIqs',
    },
  },
};
const schema14 = {
  type: 'object',
  properties: {
    include: {
      $ref: 'nXDGpwitcU96vkPTTgx7A5Lxy2q9d0AaGfchvtULXc',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
  },
  nullable: true,
};
const schema15 = {
  type: 'array',
  items: {
    $ref: 'owUZ4NHSYmUFBvF7r14Ae04qs1I5NE1lnl8fKVeto',
  },
  nullable: true,
};
const schema16 = {
  type: 'object',
  properties: {
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    params: {
      $ref: 'A2KDjAfkcUYvzsx3f6yVKhPfbU4DB1MtMfn6QZpUCqc',
    },
  },
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
function validate36(
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
  validate36.errors = vErrors;
  return errors === 0;
}
function validate35(
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
        !validate36(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  validate35.errors = vErrors;
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
    if (data.include !== undefined) {
      if (
        !validate35(data.include, {
          instancePath: instancePath + '/include',
          parentData: data,
          parentDataProperty: 'include',
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
  }
  validate34.errors = vErrors;
  return errors === 0;
}
const schema17 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    bundle: {
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
function validate46(
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
    if (data.bundle !== undefined) {
      if (
        !validate21(data.bundle, {
          instancePath: instancePath + '/bundle',
          parentData: data,
          parentDataProperty: 'bundle',
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
  validate46.errors = vErrors;
  return errors === 0;
}
const schema18 = {
  type: 'object',
  properties: {
    inputs: {
      $ref: 'YAtyqHdkhKRPMKjmT2h88rxl4jKZNiRrHsf7YdeoKs',
    },
    outputs: {
      $ref: 'YYCVbcHx8Er3js1LdMzLCQjlHDslcFmcnJzjUVRwQ',
    },
  },
  nullable: true,
};
const schema19 = {
  type: 'array',
  items: {
    $ref: 'DUgJya06V7DAn0nwI88kqpx7qXBq2BYW9y8LClo5Os',
  },
  nullable: true,
};
const schema20 = {
  type: 'object',
  required: ['name', 'resource'],
  properties: {
    from: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resource: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
const schema11 = {
  type: 'array',
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  nullable: true,
};
function validate29(
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
  validate29.errors = vErrors;
  return errors === 0;
}
function validate56(
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
    if (data.from !== undefined) {
      if (
        !validate29(data.from, {
          instancePath: instancePath + '/from',
          parentData: data,
          parentDataProperty: 'from',
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
const schema21 = {
  type: 'array',
  items: {
    $ref: '7NtJTryzZpkYXMFpXQ2NTcTwB2zPtIFQiKSxzqmWvuQ',
  },
  nullable: true,
};
const schema22 = {
  type: 'object',
  required: ['name', 'resource'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resource: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
function validate63(
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
  validate63.errors = vErrors;
  return errors === 0;
}
function validate62(
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
        !validate63(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate62.errors = vErrors;
  return errors === 0;
}
function validate54(
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
        !validate55(data.inputs, {
          instancePath: instancePath + '/inputs',
          parentData: data,
          parentDataProperty: 'inputs',
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
    if (data.outputs !== undefined) {
      if (
        !validate62(data.outputs, {
          instancePath: instancePath + '/outputs',
          parentData: data,
          parentDataProperty: 'outputs',
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
  validate54.errors = vErrors;
  return errors === 0;
}
const schema23 = {
  type: 'integer',
  nullable: true,
};
function validate69(
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
  validate69.errors = vErrors;
  return errors === 0;
}
const schema24 = {
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
function validate72(
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
    if (data.bundle !== undefined) {
      if (
        !validate21(data.bundle, {
          instancePath: instancePath + '/bundle',
          parentData: data,
          parentDataProperty: 'bundle',
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
  validate72.errors = vErrors;
  return errors === 0;
}
const schema25 = {
  type: 'array',
  items: {
    $ref: '3gytCkvMwLExpL6MGpbNjXP74frkSgUMMmU0dalCk',
  },
  nullable: true,
};
const schema26 = {
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
function validate83(
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
        !validate29(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate83.errors = vErrors;
  return errors === 0;
}
function validate82(
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
        !validate83(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate82.errors = vErrors;
  return errors === 0;
}
const schema27 = {
  type: 'array',
  items: {
    $ref: 'UeeYwlteSH90JzdII5aee54Dz6DxPB17OIS1VvY55cc',
  },
  nullable: true,
};
const schema28 = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    subPath: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    workspace: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate91(
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
    if (data.workspace !== undefined) {
      if (
        !validate21(data.workspace, {
          instancePath: instancePath + '/workspace',
          parentData: data,
          parentDataProperty: 'workspace',
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
  validate91.errors = vErrors;
  return errors === 0;
}
function validate90(
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
        !validate91(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate90.errors = vErrors;
  return errors === 0;
}
function validate32(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
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
    if (data.matrix !== undefined) {
      if (
        !validate34(data.matrix, {
          instancePath: instancePath + '/matrix',
          parentData: data,
          parentDataProperty: 'matrix',
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
        !validate21(data.onError, {
          instancePath: instancePath + '/onError',
          parentData: data,
          parentDataProperty: 'onError',
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
    if (data.pipelineRef !== undefined) {
      if (
        !validate46(data.pipelineRef, {
          instancePath: instancePath + '/pipelineRef',
          parentData: data,
          parentDataProperty: 'pipelineRef',
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
    if (data.resources !== undefined) {
      if (
        !validate54(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
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
    if (data.retries !== undefined) {
      if (
        !validate69(data.retries, {
          instancePath: instancePath + '/retries',
          parentData: data,
          parentDataProperty: 'retries',
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
    if (data.runAfter !== undefined) {
      if (
        !validate29(data.runAfter, {
          instancePath: instancePath + '/runAfter',
          parentData: data,
          parentDataProperty: 'runAfter',
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
    if (data.taskRef !== undefined) {
      if (
        !validate72(data.taskRef, {
          instancePath: instancePath + '/taskRef',
          parentData: data,
          parentDataProperty: 'taskRef',
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
    if (data.taskSpec !== undefined) {
      if (
        !validate26(data.taskSpec, {
          instancePath: instancePath + '/taskSpec',
          parentData: data,
          parentDataProperty: 'taskSpec',
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
    if (data.timeout !== undefined) {
      if (
        !validate21(data.timeout, {
          instancePath: instancePath + '/timeout',
          parentData: data,
          parentDataProperty: 'timeout',
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
    if (data.when !== undefined) {
      if (
        !validate82(data.when, {
          instancePath: instancePath + '/when',
          parentData: data,
          parentDataProperty: 'when',
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
    if (data.workspaces !== undefined) {
      if (
        !validate90(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate90.errors
            : vErrors.concat(validate90.errors);
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
        !validate32(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
const schema36 = {
  type: 'array',
  items: {
    $ref: 'CubDNCGD0a691SjxZVe1ELttRW6Lby7ZJEo4gOU',
  },
  nullable: true,
};
const schema37 = {
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
const schema38 = {
  type: 'object',
  additionalProperties: {
    $ref: '12bGl5SorwtEAV7svcAR515UJ3gXm6T8AH6G7ywQ',
  },
  properties: {},
  nullable: true,
};
const schema39 = {
  type: 'object',
  properties: {
    type: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
};
function validate117(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
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
  validate117.errors = vErrors;
  return errors === 0;
}
function validate116(
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
        !validate117(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate117.errors
            : vErrors.concat(validate117.errors);
        errors = vErrors.length;
      }
    }
  }
  validate116.errors = vErrors;
  return errors === 0;
}
function validate112(
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
        !validate26(data.default, {
          instancePath: instancePath + '/default',
          parentData: data,
          parentDataProperty: 'default',
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
    if (data.enum !== undefined) {
      if (
        !validate29(data.enum, {
          instancePath: instancePath + '/enum',
          parentData: data,
          parentDataProperty: 'enum',
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
    if (data.properties !== undefined) {
      if (
        !validate116(data.properties, {
          instancePath: instancePath + '/properties',
          parentData: data,
          parentDataProperty: 'properties',
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
  validate112.errors = vErrors;
  return errors === 0;
}
function validate111(
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
        !validate112(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate111.errors = vErrors;
  return errors === 0;
}
const schema40 = {
  type: 'array',
  items: {
    $ref: 'wxpC0dKp4u1lgEAwRCjJq18vm8g3G3wb77IKspHsGw',
  },
  nullable: true,
};
const schema41 = {
  type: 'object',
  required: ['name', 'type'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
};
const schema29 = {
  type: 'boolean',
  nullable: true,
};
function validate98(
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
  validate98.errors = vErrors;
  return errors === 0;
}
function validate125(
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
    if (data.optional !== undefined) {
      if (
        !validate98(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate125.errors = vErrors;
  return errors === 0;
}
function validate124(
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
        !validate125(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate124.errors = vErrors;
  return errors === 0;
}
const schema42 = {
  type: 'array',
  items: {
    $ref: '0HlkbqY6lHbULKs9yYnfDcE3vv0eGo3M4t8JlJbKHF0',
  },
  nullable: true,
};
const schema43 = {
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
const schema44 = {
  type: 'array',
  items: {
    $ref: 'W8vZo7bcpI2gPQnDQps87oXrv0WEdTvD2EpxZrGFy2Y',
  },
  nullable: true,
};
const schema45 = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    optional: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
  },
};
function validate140(
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
    if (data.optional !== undefined) {
      if (
        !validate98(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate140.errors = vErrors;
  return errors === 0;
}
function validate139(
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
        !validate140(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate139.errors = vErrors;
  return errors === 0;
}
function validate108(
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
    if (data.finally !== undefined) {
      if (
        !validate31(data.finally, {
          instancePath: instancePath + '/finally',
          parentData: data,
          parentDataProperty: 'finally',
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
    if (data.params !== undefined) {
      if (
        !validate111(data.params, {
          instancePath: instancePath + '/params',
          parentData: data,
          parentDataProperty: 'params',
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
    if (data.resources !== undefined) {
      if (
        !validate124(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
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
    if (data.tasks !== undefined) {
      if (
        !validate31(data.tasks, {
          instancePath: instancePath + '/tasks',
          parentData: data,
          parentDataProperty: 'tasks',
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
    if (data.workspaces !== undefined) {
      if (
        !validate139(data.workspaces, {
          instancePath: instancePath + '/workspaces',
          parentData: data,
          parentDataProperty: 'workspaces',
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
  }
  validate108.errors = vErrors;
  return errors === 0;
}
function validate99(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="tekton.dev.v1beta1.Pipeline" */
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
        !validate100(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.kind !== undefined) {
      if (
        !validate102(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
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
    if (data.metadata !== undefined) {
      if (
        !validate104(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate108(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
  validate99.errors = vErrors;
  return errors === 0;
}
