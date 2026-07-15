import { formats } from '@kubernetes-models/validate';
export const validate = validate277;
const schema81 = {
  type: 'object',
  properties: {
    apiVersion: {
      $ref: 'kvtw2AJp9KNqiBCxwSxxgKSqc6u3tMJ2DD9sIcv52oc',
    },
    kind: {
      $ref: 'Uvo41TAFM3b0a9vxbmq3SxJu2ydQndfx6anyO4aaKsM',
    },
    metadata: {
      $ref: 'a6f0oUEaFqHmymdwnqPORTNOTU7GczWAkwGD0uYU',
    },
    spec: {
      $ref: 'bVgpGEf3N6Se4kG0zfZ3DSdM3hCvOrJSl3IjrIQc',
    },
  },
  required: ['apiVersion', 'kind'],
  $id: 'trainer.kubeflow.org.v1alpha1.TrainingRuntime',
};
const schema82 = {
  type: 'string',
  enum: ['trainer.kubeflow.org/v1alpha1'],
};
function validate278(
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
  validate278.errors = vErrors;
  return errors === 0;
}
const schema83 = {
  type: 'string',
  enum: ['TrainingRuntime'],
};
function validate280(
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
  if (!(data === 'TrainingRuntime')) {
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
  validate280.errors = vErrors;
  return errors === 0;
}
const schema84 = {
  nullableRef: 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta#',
};
const schema85 = {};

import { validate as validate283 } from '@kubernetes-models/apimachinery/_schemas/IoK8sApimachineryPkgApisMetaV1ObjectMeta';

function validate282(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data !== null) {
    if (
      !validate283(data, {
        instancePath,
        parentData,
        parentDataProperty,
        rootData,
      })
    ) {
      vErrors =
        vErrors === null
          ? validate283.errors
          : vErrors.concat(validate283.errors);
      errors = vErrors.length;
    }
  }
  validate282.errors = vErrors;
  return errors === 0;
}
const schema86 = {
  properties: {
    mlPolicy: {
      $ref: '2bsUlSIPI800Tb08zESw9rZdQYsNcWC5Bcx5qQBWJnw',
    },
    podGroupPolicy: {
      $ref: 'u2o63dbzd5GPgjSQqqhUO4T3auVljAoiLnfUNG0bpE',
    },
    template: {
      $ref: 'MR9omnlLpAoaL7P9i6FgZVlTNUzZno8DVNjVXNBkL8',
    },
  },
  required: ['template'],
  type: 'object',
  nullable: true,
};
const schema87 = {
  properties: {
    mpi: {
      $ref: 'J7rkXPoF6rNUIMGSb4VCmnWRgZ7mfTZPaBX4Vz8t9ks',
    },
    numNodes: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    torch: {
      $ref: 'HbaJYKT2hGVua5d9cBP1Aty0u7srG4bS1nerrRPncIQ',
    },
  },
  type: 'object',
  nullable: true,
};
const schema88 = {
  properties: {
    mpiImplementation: {
      $ref: '8pDMfaWikHTYn7MKZXn33uQxZBk2evtvJ6QiNJ4HteY',
    },
    numProcPerNode: {
      $ref: 'yUhRBS4BLyvrLSg4WtVBSsu85PNMjthI8vcYoFyNGgw',
    },
    runLauncherAsNode: {
      $ref: 'gEUOOhuZefzFQPAU2P6REZY1YYmpGc0TVbLahK1eos',
    },
    sshAuthMountPath: {
      $ref: '31VDCwgUpr4d2j4z76h33jWqnWhuroT4HwizVmnhAY',
    },
  },
  type: 'object',
  nullable: true,
};
const schema89 = {
  default: 'OpenMPI',
  enum: ['OpenMPI'],
  type: 'string',
  nullable: true,
};
function validate289(
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
  if (!(data === 'OpenMPI')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema89.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate289.errors = vErrors;
  return errors === 0;
}
const schema21 = {
  default: 1,
  format: 'int32',
  type: 'integer',
  nullable: true,
};
const formats0 = formats.int32;
function validate54(
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
  validate54.errors = vErrors;
  return errors === 0;
}
const schema72 = {
  default: false,
  type: 'boolean',
  nullable: true,
};
function validate253(
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
  validate253.errors = vErrors;
  return errors === 0;
}
const schema90 = {
  default: '/root/.ssh',
  type: 'string',
  nullable: true,
};
function validate293(
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
  validate293.errors = vErrors;
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
    if (data.mpiImplementation !== undefined) {
      if (
        !validate289(data.mpiImplementation, {
          instancePath: instancePath + '/mpiImplementation',
          parentData: data,
          parentDataProperty: 'mpiImplementation',
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
    if (data.numProcPerNode !== undefined) {
      if (
        !validate54(data.numProcPerNode, {
          instancePath: instancePath + '/numProcPerNode',
          parentData: data,
          parentDataProperty: 'numProcPerNode',
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
    if (data.runLauncherAsNode !== undefined) {
      if (
        !validate253(data.runLauncherAsNode, {
          instancePath: instancePath + '/runLauncherAsNode',
          parentData: data,
          parentDataProperty: 'runLauncherAsNode',
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
    if (data.sshAuthMountPath !== undefined) {
      if (
        !validate293(data.sshAuthMountPath, {
          instancePath: instancePath + '/sshAuthMountPath',
          parentData: data,
          parentDataProperty: 'sshAuthMountPath',
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
  }
  validate288.errors = vErrors;
  return errors === 0;
}
const schema6 = {
  format: 'int32',
  type: 'integer',
  nullable: true,
};
function validate21(
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
  validate21.errors = vErrors;
  return errors === 0;
}
const schema91 = {
  properties: {
    elasticPolicy: {
      $ref: 'nSIJCn3s0HpEoXu5rRfpK5KPpmPS0aANJ2QoOY6N31o',
    },
    numProcPerNode: {
      $ref: 'MlaIekN0m1GQ3GYLRuXXWYFGHAAIXbz2CJX0ZdEDU',
    },
  },
  type: 'object',
  nullable: true,
};
const schema92 = {
  properties: {
    maxNodes: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    maxRestarts: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    metrics: {
      $ref: 'ssNWZOgwf6PO9Y9o6etYewqLM31HbZsroXr5QOsY',
    },
    minNodes: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
  },
  type: 'object',
  nullable: true,
};
const schema93 = {
  items: {
    $ref: 'suyPhgs6Aj1BBaNkOuV5WhGmUZg57CL1SLkWgwjls',
  },
  type: 'array',
  nullable: true,
};
const schema94 = {
  properties: {
    containerResource: {
      $ref: 'jYOOqxO1eYPv34RqG4oVWSjgY1mOSCOGTmdINN3q4',
    },
    external: {
      $ref: 'Vdb7c5YxvAsVNAtLeUf1Z9zTGjFFVChUyeqD4DsmdIw',
    },
    object: {
      $ref: 'KU47riMLbRaGh9wQcUcv4WbVIlRUD82RwbGtf9vu0',
    },
    pods: {
      $ref: 'Vdb7c5YxvAsVNAtLeUf1Z9zTGjFFVChUyeqD4DsmdIw',
    },
    resource: {
      $ref: 'cj8lFfddK3iiL7JZ9TfpbspDEuir9mI23nPTrjdT0',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['type'],
  type: 'object',
};
const schema95 = {
  properties: {
    container: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    target: {
      $ref: 'myV9Ceg5vHkIxwEJYkugK1KfqHPepACfJfXX9Smg',
    },
  },
  required: ['container', 'name', 'target'],
  type: 'object',
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
const schema10 = {
  properties: {
    averageUtilization: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    averageValue: {
      $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    value: {
      $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
    },
  },
  required: ['type'],
  type: 'object',
};
const schema8 = {
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
  validate23.errors = vErrors;
  return errors === 0;
}
function validate27(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.type === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'type',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.averageUtilization !== undefined) {
      if (
        !validate21(data.averageUtilization, {
          instancePath: instancePath + '/averageUtilization',
          parentData: data,
          parentDataProperty: 'averageUtilization',
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
    if (data.averageValue !== undefined) {
      if (
        !validate23(data.averageValue, {
          instancePath: instancePath + '/averageValue',
          parentData: data,
          parentDataProperty: 'averageValue',
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
        !validate23(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate27.errors = vErrors;
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
    if (data.container === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'container',
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
    if (data.target === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'target',
        },
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.container !== undefined) {
      if (
        !validate22(data.container, {
          instancePath: instancePath + '/container',
          parentData: data,
          parentDataProperty: 'container',
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
    if (data.target !== undefined) {
      if (
        !validate27(data.target, {
          instancePath: instancePath + '/target',
          parentData: data,
          parentDataProperty: 'target',
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
  validate303.errors = vErrors;
  return errors === 0;
}
const schema17 = {
  properties: {
    metric: {
      $ref: 'mwLIkoOxT8j8cUUAspqH28ty2vtEi4i9PFyKqMcPvw',
    },
    target: {
      $ref: 'myV9Ceg5vHkIxwEJYkugK1KfqHPepACfJfXX9Smg',
    },
  },
  required: ['metric', 'target'],
  type: 'object',
  nullable: true,
};
const schema11 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    selector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
  },
  required: ['name'],
  type: 'object',
};
const schema12 = {
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
const schema13 = {
  items: {
    $ref: 'MkwwSDeYoT1APit7w8qsvbKCw8OynjINdeojyPgpPQ',
  },
  type: 'array',
  nullable: true,
};
const schema14 = {
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
const schema15 = {
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'array',
  nullable: true,
};
function validate39(
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
  validate39.errors = vErrors;
  return errors === 0;
}
function validate36(
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
    if (data.values !== undefined) {
      if (
        !validate39(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
const schema16 = {
  additionalProperties: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'object',
  properties: {},
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
    for (const key0 in data) {
      if (
        !validate22(data[key0], {
          instancePath:
            instancePath + '/' + key0.replace(/~/g, '~0').replace(/\//g, '~1'),
          parentData: data,
          parentDataProperty: key0,
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
  validate44.errors = vErrors;
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
    if (data.matchExpressions !== undefined) {
      if (
        !validate35(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
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
    if (data.matchLabels !== undefined) {
      if (
        !validate44(data.matchLabels, {
          instancePath: instancePath + '/matchLabels',
          parentData: data,
          parentDataProperty: 'matchLabels',
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
  }
  validate34.errors = vErrors;
  return errors === 0;
}
function validate32(
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
    if (data.selector !== undefined) {
      if (
        !validate34(data.selector, {
          instancePath: instancePath + '/selector',
          parentData: data,
          parentDataProperty: 'selector',
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
  validate32.errors = vErrors;
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
    if (data.metric === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'metric',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.target === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'target',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.metric !== undefined) {
      if (
        !validate32(data.metric, {
          instancePath: instancePath + '/metric',
          parentData: data,
          parentDataProperty: 'metric',
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
    if (data.target !== undefined) {
      if (
        !validate27(data.target, {
          instancePath: instancePath + '/target',
          parentData: data,
          parentDataProperty: 'target',
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
  validate48.errors = vErrors;
  return errors === 0;
}
const schema96 = {
  properties: {
    describedObject: {
      $ref: '36oHgK9AYPuHkZgpX8JUstwE02TUfMTTo0isPAjojO4',
    },
    metric: {
      $ref: 'mwLIkoOxT8j8cUUAspqH28ty2vtEi4i9PFyKqMcPvw',
    },
    target: {
      $ref: 'myV9Ceg5vHkIxwEJYkugK1KfqHPepACfJfXX9Smg',
    },
  },
  required: ['describedObject', 'metric', 'target'],
  type: 'object',
  nullable: true,
};
const schema97 = {
  properties: {
    apiVersion: {
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
};
const schema18 = {
  type: 'string',
  nullable: true,
};
function validate51(
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
  validate51.errors = vErrors;
  return errors === 0;
}
function validate310(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.kind === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'kind',
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
    if (data.apiVersion !== undefined) {
      if (
        !validate51(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
  validate310.errors = vErrors;
  return errors === 0;
}
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
    if (data.describedObject === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'describedObject',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.metric === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'metric',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.target === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'target',
        },
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.describedObject !== undefined) {
      if (
        !validate310(data.describedObject, {
          instancePath: instancePath + '/describedObject',
          parentData: data,
          parentDataProperty: 'describedObject',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate310.errors
            : vErrors.concat(validate310.errors);
        errors = vErrors.length;
      }
    }
    if (data.metric !== undefined) {
      if (
        !validate32(data.metric, {
          instancePath: instancePath + '/metric',
          parentData: data,
          parentDataProperty: 'metric',
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
    if (data.target !== undefined) {
      if (
        !validate27(data.target, {
          instancePath: instancePath + '/target',
          parentData: data,
          parentDataProperty: 'target',
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
  validate309.errors = vErrors;
  return errors === 0;
}
const schema98 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    target: {
      $ref: 'myV9Ceg5vHkIxwEJYkugK1KfqHPepACfJfXX9Smg',
    },
  },
  required: ['name', 'target'],
  type: 'object',
  nullable: true,
};
function validate319(
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
    if (data.target === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'target',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
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
    if (data.target !== undefined) {
      if (
        !validate27(data.target, {
          instancePath: instancePath + '/target',
          parentData: data,
          parentDataProperty: 'target',
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
  validate319.errors = vErrors;
  return errors === 0;
}
function validate302(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.type === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'type',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.containerResource !== undefined) {
      if (
        !validate303(data.containerResource, {
          instancePath: instancePath + '/containerResource',
          parentData: data,
          parentDataProperty: 'containerResource',
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
    if (data.external !== undefined) {
      if (
        !validate48(data.external, {
          instancePath: instancePath + '/external',
          parentData: data,
          parentDataProperty: 'external',
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
    if (data.object !== undefined) {
      if (
        !validate309(data.object, {
          instancePath: instancePath + '/object',
          parentData: data,
          parentDataProperty: 'object',
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
    if (data.pods !== undefined) {
      if (
        !validate48(data.pods, {
          instancePath: instancePath + '/pods',
          parentData: data,
          parentDataProperty: 'pods',
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
    if (data.resource !== undefined) {
      if (
        !validate319(data.resource, {
          instancePath: instancePath + '/resource',
          parentData: data,
          parentDataProperty: 'resource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate319.errors
            : vErrors.concat(validate319.errors);
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
  validate302.errors = vErrors;
  return errors === 0;
}
function validate301(
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
        !validate302(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate301.errors = vErrors;
  return errors === 0;
}
function validate298(
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
    if (data.maxNodes !== undefined) {
      if (
        !validate21(data.maxNodes, {
          instancePath: instancePath + '/maxNodes',
          parentData: data,
          parentDataProperty: 'maxNodes',
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
    if (data.maxRestarts !== undefined) {
      if (
        !validate21(data.maxRestarts, {
          instancePath: instancePath + '/maxRestarts',
          parentData: data,
          parentDataProperty: 'maxRestarts',
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
    if (data.metrics !== undefined) {
      if (
        !validate301(data.metrics, {
          instancePath: instancePath + '/metrics',
          parentData: data,
          parentDataProperty: 'metrics',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate301.errors
            : vErrors.concat(validate301.errors);
        errors = vErrors.length;
      }
    }
    if (data.minNodes !== undefined) {
      if (
        !validate21(data.minNodes, {
          instancePath: instancePath + '/minNodes',
          parentData: data,
          parentDataProperty: 'minNodes',
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
  validate298.errors = vErrors;
  return errors === 0;
}
const schema99 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
  default: 'auto',
};
function validate328(
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
  validate328.errors = vErrors;
  return errors === 0;
}
function validate297(
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
    if (data.elasticPolicy !== undefined) {
      if (
        !validate298(data.elasticPolicy, {
          instancePath: instancePath + '/elasticPolicy',
          parentData: data,
          parentDataProperty: 'elasticPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate298.errors
            : vErrors.concat(validate298.errors);
        errors = vErrors.length;
      }
    }
    if (data.numProcPerNode !== undefined) {
      if (
        !validate328(data.numProcPerNode, {
          instancePath: instancePath + '/numProcPerNode',
          parentData: data,
          parentDataProperty: 'numProcPerNode',
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
  validate297.errors = vErrors;
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
    if (data.mpi !== undefined) {
      if (
        !validate288(data.mpi, {
          instancePath: instancePath + '/mpi',
          parentData: data,
          parentDataProperty: 'mpi',
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
    if (data.numNodes !== undefined) {
      if (
        !validate21(data.numNodes, {
          instancePath: instancePath + '/numNodes',
          parentData: data,
          parentDataProperty: 'numNodes',
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
    if (data.torch !== undefined) {
      if (
        !validate297(data.torch, {
          instancePath: instancePath + '/torch',
          parentData: data,
          parentDataProperty: 'torch',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate297.errors
            : vErrors.concat(validate297.errors);
        errors = vErrors.length;
      }
    }
  }
  validate287.errors = vErrors;
  return errors === 0;
}
const schema100 = {
  properties: {
    coscheduling: {
      $ref: 'Q9g3xemXvnMdhgcQJJDk890iVbV6m5rpI2YfvDXSA',
    },
  },
  type: 'object',
  nullable: true,
};
const schema101 = {
  properties: {
    scheduleTimeoutSeconds: {
      $ref: 'GI9VxGBbm6PMmFCcQ3wS4uHtSnLfbQe7VAA2KWdnkeY',
    },
  },
  type: 'object',
  nullable: true,
};
const schema102 = {
  default: 60,
  format: 'int32',
  type: 'integer',
  nullable: true,
};
function validate336(
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
  validate336.errors = vErrors;
  return errors === 0;
}
function validate335(
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
    if (data.scheduleTimeoutSeconds !== undefined) {
      if (
        !validate336(data.scheduleTimeoutSeconds, {
          instancePath: instancePath + '/scheduleTimeoutSeconds',
          parentData: data,
          parentDataProperty: 'scheduleTimeoutSeconds',
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
    if (data.coscheduling !== undefined) {
      if (
        !validate335(data.coscheduling, {
          instancePath: instancePath + '/coscheduling',
          parentData: data,
          parentDataProperty: 'coscheduling',
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
  }
  validate334.errors = vErrors;
  return errors === 0;
}
const schema103 = {
  properties: {
    metadata: {
      $ref: 'jynRVyKr0doMQvLMloozBEYX7ZohkIlAIqCnjwO8',
    },
    spec: {
      $ref: 'pzMjBOZw0gWL8MStYiM3nKUzOPQqDEp86StlIH5Z2E',
    },
  },
  type: 'object',
};
const schema22 = {
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
    if (data.annotations !== undefined) {
      if (
        !validate44(data.annotations, {
          instancePath: instancePath + '/annotations',
          parentData: data,
          parentDataProperty: 'annotations',
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
    if (data.finalizers !== undefined) {
      if (
        !validate39(data.finalizers, {
          instancePath: instancePath + '/finalizers',
          parentData: data,
          parentDataProperty: 'finalizers',
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
    if (data.labels !== undefined) {
      if (
        !validate44(data.labels, {
          instancePath: instancePath + '/labels',
          parentData: data,
          parentDataProperty: 'labels',
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
    if (data.name !== undefined) {
      if (
        !validate51(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.namespace !== undefined) {
      if (
        !validate51(data.namespace, {
          instancePath: instancePath + '/namespace',
          parentData: data,
          parentDataProperty: 'namespace',
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
  validate55.errors = vErrors;
  return errors === 0;
}
const schema104 = {
  properties: {
    coordinator: {
      $ref: 'uN4uVbYcqxYIigthkg7fDNLkkffiDp9ZJ3xEAgZX0AA',
    },
    failurePolicy: {
      $ref: 'mf8rGzDzCZNDcfchEcuewLc6qaYvsRB0YGToKZJLNk',
    },
    managedBy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    network: {
      $ref: 'CJZLqZDrHlsLnxsihKebP2UHJY8Xj2Zo4B5ukRxB4',
    },
    replicatedJobs: {
      $ref: 'Dx2qCYlbp2nSyzsjC8dmc4JSpkJ5BUrljuibhwCRSQ',
    },
    startupPolicy: {
      $ref: 'QCAALmqLhAeaKMyZyJi6aSwIOZbZG6QziZ2eawWFak',
    },
    successPolicy: {
      $ref: 'MOE9FehA9khtcKmSLaP6XM6vGpDMl5etIohQi9PiF0',
    },
    suspend: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    ttlSecondsAfterFinished: {
      $ref: 'w5IhIKa86RwAovE05iaUbTTyUvDPPwDIMFk2QbV9s2w',
    },
  },
  type: 'object',
  nullable: true,
};
const schema105 = {
  properties: {
    jobIndex: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    podIndex: {
      $ref: 'CZNoVCXQYuwanyJkiA9GsIPJnKVUhcC3TsHe7jwaJk',
    },
    replicatedJob: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['replicatedJob'],
  type: 'object',
  nullable: true,
};
const schema19 = {
  type: 'integer',
  nullable: true,
};
function validate52(
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
  validate52.errors = vErrors;
  return errors === 0;
}
function validate343(
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
    if (data.replicatedJob === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'replicatedJob',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.jobIndex !== undefined) {
      if (
        !validate52(data.jobIndex, {
          instancePath: instancePath + '/jobIndex',
          parentData: data,
          parentDataProperty: 'jobIndex',
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
    if (data.podIndex !== undefined) {
      if (
        !validate52(data.podIndex, {
          instancePath: instancePath + '/podIndex',
          parentData: data,
          parentDataProperty: 'podIndex',
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
    if (data.replicatedJob !== undefined) {
      if (
        !validate22(data.replicatedJob, {
          instancePath: instancePath + '/replicatedJob',
          parentData: data,
          parentDataProperty: 'replicatedJob',
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
  validate343.errors = vErrors;
  return errors === 0;
}
const schema106 = {
  properties: {
    maxRestarts: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    restartStrategy: {
      $ref: 'DAnQiKsNF0YzNauhwXXBweptKE1ZmsPqEqH2iBvHnc',
    },
    rules: {
      $ref: 'OCtK2NzNS85MzXWwKl9p20QFo3LSIksy6vCQCaqDaHg',
    },
  },
  type: 'object',
  nullable: true,
};
const schema107 = {
  default: 'Recreate',
  enum: ['Recreate', 'BlockingRecreate'],
  type: 'string',
  nullable: true,
};
function validate350(
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
  if (!(data === 'Recreate' || data === 'BlockingRecreate')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema107.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate350.errors = vErrors;
  return errors === 0;
}
const schema108 = {
  items: {
    $ref: 'RGPYhrl04m7gtpPuH37pp5cUCp4d15gsNSOSaE5zaM',
  },
  type: 'array',
  nullable: true,
};
const schema109 = {
  properties: {
    action: {
      $ref: '1ZQahKnPfu5usAQGBpy1HmMppvGbV667xoqqgCLU',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    onJobFailureReasons: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    targetReplicatedJobs: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  required: ['action', 'name'],
  type: 'object',
};
const schema110 = {
  enum: ['FailJobSet', 'RestartJobSet', 'RestartJobSetAndIgnoreMaxRestarts'],
  type: 'string',
};
function validate354(
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
  if (
    !(
      data === 'FailJobSet' ||
      data === 'RestartJobSet' ||
      data === 'RestartJobSetAndIgnoreMaxRestarts'
    )
  ) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema110.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate354.errors = vErrors;
  return errors === 0;
}
function validate353(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.action === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'action',
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
    if (data.action !== undefined) {
      if (
        !validate354(data.action, {
          instancePath: instancePath + '/action',
          parentData: data,
          parentDataProperty: 'action',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate354.errors
            : vErrors.concat(validate354.errors);
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
    if (data.onJobFailureReasons !== undefined) {
      if (
        !validate39(data.onJobFailureReasons, {
          instancePath: instancePath + '/onJobFailureReasons',
          parentData: data,
          parentDataProperty: 'onJobFailureReasons',
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
    if (data.targetReplicatedJobs !== undefined) {
      if (
        !validate39(data.targetReplicatedJobs, {
          instancePath: instancePath + '/targetReplicatedJobs',
          parentData: data,
          parentDataProperty: 'targetReplicatedJobs',
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
  validate353.errors = vErrors;
  return errors === 0;
}
function validate352(
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
        !validate353(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate352.errors = vErrors;
  return errors === 0;
}
function validate348(
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
    if (data.maxRestarts !== undefined) {
      if (
        !validate21(data.maxRestarts, {
          instancePath: instancePath + '/maxRestarts',
          parentData: data,
          parentDataProperty: 'maxRestarts',
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
    if (data.restartStrategy !== undefined) {
      if (
        !validate350(data.restartStrategy, {
          instancePath: instancePath + '/restartStrategy',
          parentData: data,
          parentDataProperty: 'restartStrategy',
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
    if (data.rules !== undefined) {
      if (
        !validate352(data.rules, {
          instancePath: instancePath + '/rules',
          parentData: data,
          parentDataProperty: 'rules',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate352.errors
            : vErrors.concat(validate352.errors);
        errors = vErrors.length;
      }
    }
  }
  validate348.errors = vErrors;
  return errors === 0;
}
const schema111 = {
  properties: {
    enableDNSHostnames: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    publishNotReadyAddresses: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    subdomain: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
  nullable: true,
};
const schema20 = {
  type: 'boolean',
  nullable: true,
};
function validate53(
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
  validate53.errors = vErrors;
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
    if (data.enableDNSHostnames !== undefined) {
      if (
        !validate53(data.enableDNSHostnames, {
          instancePath: instancePath + '/enableDNSHostnames',
          parentData: data,
          parentDataProperty: 'enableDNSHostnames',
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
    if (data.publishNotReadyAddresses !== undefined) {
      if (
        !validate53(data.publishNotReadyAddresses, {
          instancePath: instancePath + '/publishNotReadyAddresses',
          parentData: data,
          parentDataProperty: 'publishNotReadyAddresses',
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
    if (data.subdomain !== undefined) {
      if (
        !validate51(data.subdomain, {
          instancePath: instancePath + '/subdomain',
          parentData: data,
          parentDataProperty: 'subdomain',
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
  validate363.errors = vErrors;
  return errors === 0;
}
const schema112 = {
  items: {
    $ref: 'hI2z407khNlZVXF15JnVeg4sCU6UUK5PE3bDY9st30',
  },
  type: 'array',
  nullable: true,
};
const schema113 = {
  properties: {
    dependsOn: {
      $ref: 'htZ7cibbuFIoulKbW6YKgcNb9rcCgIdHLCDdO1x8',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    replicas: {
      $ref: 'yUhRBS4BLyvrLSg4WtVBSsu85PNMjthI8vcYoFyNGgw',
    },
    template: {
      $ref: 'fwm795ybMeQdiKcH8JTR1u0rXExa3Ww4XBc7j0kQFs',
    },
  },
  required: ['name', 'template'],
  type: 'object',
};
const schema114 = {
  items: {
    $ref: 'HCClEL4yMNpnCdCD96BRYl7UWRDu4T5g8IH2u8fyZw',
  },
  maxItems: 1,
  type: 'array',
  nullable: true,
};
const schema115 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    status: {
      $ref: 'zKC8b84zDsPtkH8roDvv6382ueGYyiX18qOQflnYbt0',
    },
  },
  required: ['name', 'status'],
  type: 'object',
};
const schema116 = {
  enum: ['Ready', 'Complete'],
  type: 'string',
};
function validate373(
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
  if (!(data === 'Ready' || data === 'Complete')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema116.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate373.errors = vErrors;
  return errors === 0;
}
function validate371(
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
    if (data.status === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'status',
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
    if (data.status !== undefined) {
      if (
        !validate373(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
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
  validate371.errors = vErrors;
  return errors === 0;
}
function validate370(
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
    if (data.length > 1) {
      const err1 = {
        instancePath,
        schemaPath: '#/maxItems',
        keyword: 'maxItems',
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
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate371(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate371.errors
            : vErrors.concat(validate371.errors);
        errors = vErrors.length;
      }
    }
  }
  validate370.errors = vErrors;
  return errors === 0;
}
const schema117 = {
  properties: {
    metadata: {
      $ref: 'jynRVyKr0doMQvLMloozBEYX7ZohkIlAIqCnjwO8',
    },
    spec: {
      $ref: '9jtlDjffxNXlEDNqbaa91kTA3T0BVOfdfE7Wyo57o',
    },
  },
  type: 'object',
};
const schema118 = {
  properties: {
    activeDeadlineSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    backoffLimit: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    backoffLimitPerIndex: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    completionMode: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    completions: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    managedBy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    manualSelector: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    maxFailedIndexes: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    parallelism: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    podFailurePolicy: {
      $ref: 'G1EATFDVmRtuENI27FE1oku7VL0ygGlf5AFMM9DDc24',
    },
    podReplacementPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    selector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    successPolicy: {
      $ref: 'YRQvRVzOC4V0LGV0yMqhmAPVPuN8BpKYXZtVWgNRI',
    },
    suspend: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    template: {
      $ref: 'MBgKJOgLzqdcBrb2NRcBkIA8KF7C1vSvGCkpJ5Vw00',
    },
    ttlSecondsAfterFinished: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
  },
  required: ['template'],
  type: 'object',
  nullable: true,
};
const schema23 = {
  format: 'int64',
  type: 'integer',
  nullable: true,
};
const formats4 = formats.int64;
function validate61(
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
    if (!formats4.validate(data)) {
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
  validate61.errors = vErrors;
  return errors === 0;
}
const schema119 = {
  properties: {
    rules: {
      $ref: 'As07T49wKUxrZTZ2dvCGCSOMJ4NvB3pBFgbykPZXUBg',
    },
  },
  required: ['rules'],
  type: 'object',
  nullable: true,
};
const schema120 = {
  items: {
    $ref: 'TwNNn4BT11b1ahftEPdEXPvwfCJxv99EdqtMnu0gv1g',
  },
  type: 'array',
};
const schema121 = {
  properties: {
    action: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    onExitCodes: {
      $ref: 'cB1vJLL58zL7tso468E6rIJbswH7AKW7PPVQtFILewQ',
    },
    onPodConditions: {
      $ref: '9tUNhziNinW9hB7hqha8hqOZ0ebIawFSsIB1sDvRLM',
    },
  },
  required: ['action'],
  type: 'object',
};
const schema122 = {
  properties: {
    containerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    operator: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    values: {
      $ref: 'yXZknTO64r88FhMQLfCvzFdz4fRGUuru3whrgC4mVEg',
    },
  },
  required: ['operator', 'values'],
  type: 'object',
  nullable: true,
};
const schema123 = {
  items: {
    $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
  },
  type: 'array',
};
const schema24 = {
  format: 'int32',
  type: 'integer',
};
function validate62(
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
  validate62.errors = vErrors;
  return errors === 0;
}
function validate398(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
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
  validate398.errors = vErrors;
  return errors === 0;
}
function validate395(
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
    if (data.values === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'values',
        },
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.containerName !== undefined) {
      if (
        !validate51(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
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
        !validate398(data.values, {
          instancePath: instancePath + '/values',
          parentData: data,
          parentDataProperty: 'values',
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
  validate395.errors = vErrors;
  return errors === 0;
}
const schema124 = {
  items: {
    $ref: 'POEUzNufOLVomghwVR744VnMB02XT4J9J13rGT6SU',
  },
  type: 'array',
  nullable: true,
};
const schema125 = {
  properties: {
    status: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['status', 'type'],
  type: 'object',
};
function validate403(
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
    if (data.status !== undefined) {
      if (
        !validate22(data.status, {
          instancePath: instancePath + '/status',
          parentData: data,
          parentDataProperty: 'status',
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
  validate403.errors = vErrors;
  return errors === 0;
}
function validate402(
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
        !validate403(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate402.errors = vErrors;
  return errors === 0;
}
function validate393(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.action === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'action',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.action !== undefined) {
      if (
        !validate22(data.action, {
          instancePath: instancePath + '/action',
          parentData: data,
          parentDataProperty: 'action',
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
    if (data.onExitCodes !== undefined) {
      if (
        !validate395(data.onExitCodes, {
          instancePath: instancePath + '/onExitCodes',
          parentData: data,
          parentDataProperty: 'onExitCodes',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate395.errors
            : vErrors.concat(validate395.errors);
        errors = vErrors.length;
      }
    }
    if (data.onPodConditions !== undefined) {
      if (
        !validate402(data.onPodConditions, {
          instancePath: instancePath + '/onPodConditions',
          parentData: data,
          parentDataProperty: 'onPodConditions',
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
  validate393.errors = vErrors;
  return errors === 0;
}
function validate392(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate393(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate393.errors
            : vErrors.concat(validate393.errors);
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
  validate392.errors = vErrors;
  return errors === 0;
}
function validate391(
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
    if (data.rules === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'rules',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.rules !== undefined) {
      if (
        !validate392(data.rules, {
          instancePath: instancePath + '/rules',
          parentData: data,
          parentDataProperty: 'rules',
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
  }
  validate391.errors = vErrors;
  return errors === 0;
}
const schema126 = {
  properties: {
    rules: {
      $ref: '4sdLShxx4Qm5eynDK8wtk2RfDuO0Q1QYNy8GLhhU0jo',
    },
  },
  required: ['rules'],
  type: 'object',
  nullable: true,
};
const schema127 = {
  items: {
    $ref: 'VsaEzAkym88wpBH8KEeHyOeDDaZqdoExZ4UtmHc',
  },
  type: 'array',
};
const schema128 = {
  properties: {
    succeededCount: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    succeededIndexes: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
};
function validate415(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.succeededCount !== undefined) {
      if (
        !validate21(data.succeededCount, {
          instancePath: instancePath + '/succeededCount',
          parentData: data,
          parentDataProperty: 'succeededCount',
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
    if (data.succeededIndexes !== undefined) {
      if (
        !validate51(data.succeededIndexes, {
          instancePath: instancePath + '/succeededIndexes',
          parentData: data,
          parentDataProperty: 'succeededIndexes',
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
  validate415.errors = vErrors;
  return errors === 0;
}
function validate414(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate415(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate415.errors
            : vErrors.concat(validate415.errors);
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
  validate414.errors = vErrors;
  return errors === 0;
}
function validate413(
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
    if (data.rules === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'rules',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.rules !== undefined) {
      if (
        !validate414(data.rules, {
          instancePath: instancePath + '/rules',
          parentData: data,
          parentDataProperty: 'rules',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate414.errors
            : vErrors.concat(validate414.errors);
        errors = vErrors.length;
      }
    }
  }
  validate413.errors = vErrors;
  return errors === 0;
}
const schema129 = {
  properties: {
    metadata: {
      $ref: 'jynRVyKr0doMQvLMloozBEYX7ZohkIlAIqCnjwO8',
    },
    spec: {
      $ref: 'XImJqc3UDikxyG5huerz2nWKcVOkqD6gF0HXF5t2M',
    },
  },
  type: 'object',
};
const schema130 = {
  properties: {
    activeDeadlineSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    affinity: {
      $ref: 'NaNeXKn0QKRMisXuVeCRDHK1E3tk7kcciv2xStV5SY',
    },
    automountServiceAccountToken: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    containers: {
      $ref: 'wp06JRLNyFFfJYHLnEw5o4XOm1HE0ZbyXfQ2GM2RLvw',
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
    ephemeralContainers: {
      $ref: 'ovRwHrlpCJij2bx6yJv8YJBtXFNY7QFTmn4lyxdPg',
    },
    hostAliases: {
      $ref: '5MWDwEVEHtLj7phXIhfn8FkfVDV2GrmVP2upiAixU',
    },
    hostIPC: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    hostNetwork: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    hostPID: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    hostUsers: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    hostname: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    imagePullSecrets: {
      $ref: 'wYb0JT25mTSwRer7ZdQj9ETTR3jt94ISSvAy2nuU',
    },
    initContainers: {
      $ref: 'sguBgMigMh04Gi6swoUF9zNDBkKpQAX3c1Xy4FaOf4',
    },
    nodeName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    nodeSelector: {
      $ref: 'C53Ns4GLXWl74ijREqYSmV6XcmHYHGe7sMKYak37s',
    },
    os: {
      $ref: 'OAgQGC3YN1FICnXF5ReeaD1QWt6Riug0pHBXOEYs',
    },
    overhead: {
      $ref: 'gjo16z3NV0NSVrHi0ow9dEFkpRekg7uAIyza4KmU',
    },
    preemptionPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    priority: {
      $ref: 'Ccz0XZyNWiwVpe2nvsmnlMV1SnfQGMXuejl0yByE',
    },
    priorityClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    readinessGates: {
      $ref: 'Q6N7tALrvkRTPyPygAPvBhRBXKuUnzIstnLvap8aNpo',
    },
    resourceClaims: {
      $ref: 'nU4YgmY2pGzwvJSdGX1czf7i5TIZDGCrmuMRFgv70',
    },
    resources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    restartPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    runtimeClassName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    schedulerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    schedulingGates: {
      $ref: 'xcpG1cEijhhVdOeFxCi8O2nBHHEkNfBU2rvTOFs7LU',
    },
    securityContext: {
      $ref: 'K3YddoZXrkyZaPHx0yNqjLumhOnA2hv4D7thT0rfos',
    },
    serviceAccount: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    serviceAccountName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    setHostnameAsFQDN: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    shareProcessNamespace: {
      $ref: 'hsGPmGwy4VrrbOBJwiGgjUKGPtMFeHO5cmtUu5ZUh0',
    },
    subdomain: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    terminationGracePeriodSeconds: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    tolerations: {
      $ref: '0n4c9hC8BjWXgqJPcgtzXIbgzIfyT58Oy1pU5nsoec',
    },
    topologySpreadConstraints: {
      $ref: '41mgk2SDFjdQwKv2VPdOODZzv1bDMOctKEj0z6qFY',
    },
    volumes: {
      $ref: 'LODTnLZSrHecQGhNVRXyU73kV3yOSt4amI4d6y4bVe4',
    },
  },
  required: ['containers'],
  type: 'object',
  nullable: true,
};
const schema131 = {
  properties: {
    nodeAffinity: {
      $ref: 'ilIeGX7cSHMmL7ioNwzODU6lYXSv4jarxIX2s8IW4',
    },
    podAffinity: {
      $ref: 'ylEmtwtSwg82hhEoqDrbiteTjVi6TsrDIUlC8rMoQaQ',
    },
    podAntiAffinity: {
      $ref: 'ylEmtwtSwg82hhEoqDrbiteTjVi6TsrDIUlC8rMoQaQ',
    },
  },
  type: 'object',
  nullable: true,
};
const schema132 = {
  properties: {
    preferredDuringSchedulingIgnoredDuringExecution: {
      $ref: 'HC615OS3o4FaxIeSsZYUiEWpRFwokElNCDLKZWAw',
    },
    requiredDuringSchedulingIgnoredDuringExecution: {
      $ref: 'yWknb7dT7ue0rjnNXkPUrp1WPuHKhs0S6rXzUG4qQHM',
    },
  },
  type: 'object',
  nullable: true,
};
const schema133 = {
  items: {
    $ref: 'KT8yO8lY4mlKxs74BP1LG0T6VlK79euyrEXXie1TQM',
  },
  type: 'array',
  nullable: true,
};
const schema134 = {
  properties: {
    preference: {
      $ref: 'tydPzboPRD4fGreI5KQTJcmvoGoGl0gxaSYfabYh8UI',
    },
    weight: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
  },
  required: ['preference', 'weight'],
  type: 'object',
};
const schema25 = {
  properties: {
    matchExpressions: {
      $ref: '9BW0WuIp1SxhBT4vHohXPUikn0YuwzPq2mNUBC1NsE',
    },
    matchFields: {
      $ref: '9BW0WuIp1SxhBT4vHohXPUikn0YuwzPq2mNUBC1NsE',
    },
  },
  type: 'object',
};
function validate63(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.matchExpressions !== undefined) {
      if (
        !validate35(data.matchExpressions, {
          instancePath: instancePath + '/matchExpressions',
          parentData: data,
          parentDataProperty: 'matchExpressions',
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
    if (data.matchFields !== undefined) {
      if (
        !validate35(data.matchFields, {
          instancePath: instancePath + '/matchFields',
          parentData: data,
          parentDataProperty: 'matchFields',
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
  validate63.errors = vErrors;
  return errors === 0;
}
function validate429(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.preference === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'preference',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.weight === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'weight',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.preference !== undefined) {
      if (
        !validate63(data.preference, {
          instancePath: instancePath + '/preference',
          parentData: data,
          parentDataProperty: 'preference',
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
    if (data.weight !== undefined) {
      if (
        !validate62(data.weight, {
          instancePath: instancePath + '/weight',
          parentData: data,
          parentDataProperty: 'weight',
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
  validate429.errors = vErrors;
  return errors === 0;
}
function validate428(
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
        !validate429(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate428.errors = vErrors;
  return errors === 0;
}
const schema135 = {
  properties: {
    nodeSelectorTerms: {
      $ref: 'hVQp5aNt5Ip0WaaRBpcUfl5xvhWH5vfkg8VQq1is',
    },
  },
  required: ['nodeSelectorTerms'],
  type: 'object',
  nullable: true,
};
const schema136 = {
  items: {
    $ref: 'tydPzboPRD4fGreI5KQTJcmvoGoGl0gxaSYfabYh8UI',
  },
  type: 'array',
};
function validate435(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
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
  validate435.errors = vErrors;
  return errors === 0;
}
function validate434(
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
    if (data.nodeSelectorTerms === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'nodeSelectorTerms',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.nodeSelectorTerms !== undefined) {
      if (
        !validate435(data.nodeSelectorTerms, {
          instancePath: instancePath + '/nodeSelectorTerms',
          parentData: data,
          parentDataProperty: 'nodeSelectorTerms',
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
    if (data.preferredDuringSchedulingIgnoredDuringExecution !== undefined) {
      if (
        !validate428(data.preferredDuringSchedulingIgnoredDuringExecution, {
          instancePath:
            instancePath + '/preferredDuringSchedulingIgnoredDuringExecution',
          parentData: data,
          parentDataProperty: 'preferredDuringSchedulingIgnoredDuringExecution',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate428.errors
            : vErrors.concat(validate428.errors);
        errors = vErrors.length;
      }
    }
    if (data.requiredDuringSchedulingIgnoredDuringExecution !== undefined) {
      if (
        !validate434(data.requiredDuringSchedulingIgnoredDuringExecution, {
          instancePath:
            instancePath + '/requiredDuringSchedulingIgnoredDuringExecution',
          parentData: data,
          parentDataProperty: 'requiredDuringSchedulingIgnoredDuringExecution',
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
  validate427.errors = vErrors;
  return errors === 0;
}
const schema27 = {
  properties: {
    preferredDuringSchedulingIgnoredDuringExecution: {
      $ref: 'ktW8omwsdv4h1ZUVBdxEhxZhXj5nxkm43N9pcvJrrM',
    },
    requiredDuringSchedulingIgnoredDuringExecution: {
      $ref: 'ktctqYOAsMHIixg2Gm2aXkNpxOJnHjW8wto3QV1AUxA',
    },
  },
  type: 'object',
  nullable: true,
};
const schema28 = {
  items: {
    $ref: 'LepDbJcwPnCcyZ7mVuZvtxVde3n1waMDxZcCV0sNkA',
  },
  type: 'array',
  nullable: true,
};
const schema29 = {
  properties: {
    podAffinityTerm: {
      $ref: 'GyfMzSslA4sUTVEUXrenLtQzpQAdbyIramP0NI208y8',
    },
    weight: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
  },
  required: ['podAffinityTerm', 'weight'],
  type: 'object',
};
const schema26 = {
  properties: {
    labelSelector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    matchLabelKeys: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    mismatchLabelKeys: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    namespaceSelector: {
      $ref: 'Zjt3HFRfql15zSZzpouBNTusTEhVu3UqWLOK7EP6U',
    },
    namespaces: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    topologyKey: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['topologyKey'],
  type: 'object',
};
function validate66(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.topologyKey === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'topologyKey',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.labelSelector !== undefined) {
      if (
        !validate34(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
    if (data.matchLabelKeys !== undefined) {
      if (
        !validate39(data.matchLabelKeys, {
          instancePath: instancePath + '/matchLabelKeys',
          parentData: data,
          parentDataProperty: 'matchLabelKeys',
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
    if (data.mismatchLabelKeys !== undefined) {
      if (
        !validate39(data.mismatchLabelKeys, {
          instancePath: instancePath + '/mismatchLabelKeys',
          parentData: data,
          parentDataProperty: 'mismatchLabelKeys',
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
    if (data.namespaceSelector !== undefined) {
      if (
        !validate34(data.namespaceSelector, {
          instancePath: instancePath + '/namespaceSelector',
          parentData: data,
          parentDataProperty: 'namespaceSelector',
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
    if (data.namespaces !== undefined) {
      if (
        !validate39(data.namespaces, {
          instancePath: instancePath + '/namespaces',
          parentData: data,
          parentDataProperty: 'namespaces',
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
    if (data.topologyKey !== undefined) {
      if (
        !validate22(data.topologyKey, {
          instancePath: instancePath + '/topologyKey',
          parentData: data,
          parentDataProperty: 'topologyKey',
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
  validate66.errors = vErrors;
  return errors === 0;
}
function validate75(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.podAffinityTerm === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'podAffinityTerm',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.weight === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'weight',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.podAffinityTerm !== undefined) {
      if (
        !validate66(data.podAffinityTerm, {
          instancePath: instancePath + '/podAffinityTerm',
          parentData: data,
          parentDataProperty: 'podAffinityTerm',
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
    if (data.weight !== undefined) {
      if (
        !validate62(data.weight, {
          instancePath: instancePath + '/weight',
          parentData: data,
          parentDataProperty: 'weight',
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
const schema30 = {
  items: {
    $ref: 'GyfMzSslA4sUTVEUXrenLtQzpQAdbyIramP0NI208y8',
  },
  type: 'array',
  nullable: true,
};
function validate80(
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
  validate80.errors = vErrors;
  return errors === 0;
}
function validate73(
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
    if (data.preferredDuringSchedulingIgnoredDuringExecution !== undefined) {
      if (
        !validate74(data.preferredDuringSchedulingIgnoredDuringExecution, {
          instancePath:
            instancePath + '/preferredDuringSchedulingIgnoredDuringExecution',
          parentData: data,
          parentDataProperty: 'preferredDuringSchedulingIgnoredDuringExecution',
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
    if (data.requiredDuringSchedulingIgnoredDuringExecution !== undefined) {
      if (
        !validate80(data.requiredDuringSchedulingIgnoredDuringExecution, {
          instancePath:
            instancePath + '/requiredDuringSchedulingIgnoredDuringExecution',
          parentData: data,
          parentDataProperty: 'requiredDuringSchedulingIgnoredDuringExecution',
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
  validate73.errors = vErrors;
  return errors === 0;
}
function validate426(
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
    if (data.nodeAffinity !== undefined) {
      if (
        !validate427(data.nodeAffinity, {
          instancePath: instancePath + '/nodeAffinity',
          parentData: data,
          parentDataProperty: 'nodeAffinity',
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
    if (data.podAffinity !== undefined) {
      if (
        !validate73(data.podAffinity, {
          instancePath: instancePath + '/podAffinity',
          parentData: data,
          parentDataProperty: 'podAffinity',
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
    if (data.podAntiAffinity !== undefined) {
      if (
        !validate73(data.podAntiAffinity, {
          instancePath: instancePath + '/podAntiAffinity',
          parentData: data,
          parentDataProperty: 'podAntiAffinity',
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
  }
  validate426.errors = vErrors;
  return errors === 0;
}
const schema137 = {
  items: {
    $ref: 'xYv6SPJM8Nd0O3ilEaHDD2OAb7lSkClfTH7nyqw',
  },
  type: 'array',
};
const schema71 = {
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
    resizePolicy: {
      $ref: '6GSWrpaVmXpudv48RvtoxAgwJVMPod1ZDpz48dxmpTE',
    },
    resources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    restartPolicy: {
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
  },
  required: ['name'],
  type: 'object',
};
const schema47 = {
  items: {
    $ref: 'mcIT4sxSEw0qcfKK2T7pAL60UOsXUhJ9jypQATxBGA',
  },
  type: 'array',
  nullable: true,
};
const schema48 = {
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
const schema49 = {
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
const schema31 = {
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
const schema32 = {
  default: '',
  type: 'string',
  nullable: true,
};
function validate85(
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
  validate85.errors = vErrors;
  return errors === 0;
}
function validate83(
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
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate83.errors = vErrors;
  return errors === 0;
}
const schema50 = {
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
function validate143(
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
        !validate51(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
  validate143.errors = vErrors;
  return errors === 0;
}
const schema51 = {
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
        !validate51(data.containerName, {
          instancePath: instancePath + '/containerName',
          parentData: data,
          parentDataProperty: 'containerName',
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
  validate147.errors = vErrors;
  return errors === 0;
}
function validate141(
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
        !validate83(data.configMapKeyRef, {
          instancePath: instancePath + '/configMapKeyRef',
          parentData: data,
          parentDataProperty: 'configMapKeyRef',
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
    if (data.fieldRef !== undefined) {
      if (
        !validate143(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate147(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
    if (data.secretKeyRef !== undefined) {
      if (
        !validate83(data.secretKeyRef, {
          instancePath: instancePath + '/secretKeyRef',
          parentData: data,
          parentDataProperty: 'secretKeyRef',
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
  validate141.errors = vErrors;
  return errors === 0;
}
function validate138(
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
        !validate51(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
    if (data.valueFrom !== undefined) {
      if (
        !validate141(data.valueFrom, {
          instancePath: instancePath + '/valueFrom',
          parentData: data,
          parentDataProperty: 'valueFrom',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate141.errors
            : vErrors.concat(validate141.errors);
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
  validate138.errors = vErrors;
  return errors === 0;
}
function validate137(
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
        !validate138(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate137.errors = vErrors;
  return errors === 0;
}
const schema52 = {
  items: {
    $ref: 'kFpnHd2NZ4UZDP4b3m62HC4SlJSOSeKF9pyuy1Pa7OM',
  },
  type: 'array',
  nullable: true,
};
const schema53 = {
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
  type: 'object',
};
const schema33 = {
  properties: {
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
function validate88(
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
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate88.errors = vErrors;
  return errors === 0;
}
function validate156(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.configMapRef !== undefined) {
      if (
        !validate88(data.configMapRef, {
          instancePath: instancePath + '/configMapRef',
          parentData: data,
          parentDataProperty: 'configMapRef',
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
    if (data.prefix !== undefined) {
      if (
        !validate51(data.prefix, {
          instancePath: instancePath + '/prefix',
          parentData: data,
          parentDataProperty: 'prefix',
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
    if (data.secretRef !== undefined) {
      if (
        !validate88(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
const schema54 = {
  properties: {
    postStart: {
      $ref: 'G29yhCt6zCEjqe0gdZcfsDrOST0tQlucjrHZckS9DrM',
    },
    preStop: {
      $ref: 'G29yhCt6zCEjqe0gdZcfsDrOST0tQlucjrHZckS9DrM',
    },
  },
  type: 'object',
  nullable: true,
};
const schema35 = {
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
  type: 'object',
  nullable: true,
};
const schema36 = {
  properties: {
    command: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  type: 'object',
  nullable: true,
};
function validate95(
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
        !validate39(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
  validate95.errors = vErrors;
  return errors === 0;
}
const schema37 = {
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
  required: ['port'],
  type: 'object',
  nullable: true,
};
const schema38 = {
  items: {
    $ref: 'RI8VVk8l4SnLWK7FbWs0RBoAVoSBUKkroMUjUfsI',
  },
  type: 'array',
  nullable: true,
};
const schema39 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    value: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['name', 'value'],
  type: 'object',
};
function validate101(
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
const schema34 = {
  anyOf: [
    {
      $ref: 'vMERCWCezVsdN7cIwlJvWJTP5QRRevuFDHNM3fdV8Q',
    },
    {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  ],
};
function validate91(
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
  validate91.errors = vErrors;
  return errors === 0;
}
function validate98(
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
        !validate51(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.httpHeaders !== undefined) {
      if (
        !validate100(data.httpHeaders, {
          instancePath: instancePath + '/httpHeaders',
          parentData: data,
          parentDataProperty: 'httpHeaders',
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
    if (data.path !== undefined) {
      if (
        !validate51(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.port !== undefined) {
      if (
        !validate91(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
    if (data.scheme !== undefined) {
      if (
        !validate51(data.scheme, {
          instancePath: instancePath + '/scheme',
          parentData: data,
          parentDataProperty: 'scheme',
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
  validate98.errors = vErrors;
  return errors === 0;
}
const schema40 = {
  properties: {
    seconds: {
      $ref: 'icwF9bpzvIS3QxC52v2XvqrjjaZnFwyMbHUnptLeEQ',
    },
  },
  required: ['seconds'],
  type: 'object',
  nullable: true,
};
const schema41 = {
  format: 'int64',
  type: 'integer',
};
function validate111(
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
    if (!formats4.validate(data)) {
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
function validate110(
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
        !validate111(data.seconds, {
          instancePath: instancePath + '/seconds',
          parentData: data,
          parentDataProperty: 'seconds',
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
const schema42 = {
  properties: {
    host: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    port: {
      $ref: 'uJPY5JwdoQeyZsG50sBXB6uBQV8ScD7PtRRAnILoI3A',
    },
  },
  required: ['port'],
  type: 'object',
  nullable: true,
};
function validate114(
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
        !validate51(data.host, {
          instancePath: instancePath + '/host',
          parentData: data,
          parentDataProperty: 'host',
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
    if (data.port !== undefined) {
      if (
        !validate91(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
  validate114.errors = vErrors;
  return errors === 0;
}
function validate94(
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
        !validate95(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
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
    if (data.httpGet !== undefined) {
      if (
        !validate98(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.sleep !== undefined) {
      if (
        !validate110(data.sleep, {
          instancePath: instancePath + '/sleep',
          parentData: data,
          parentDataProperty: 'sleep',
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
    if (data.tcpSocket !== undefined) {
      if (
        !validate114(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
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
  }
  validate94.errors = vErrors;
  return errors === 0;
}
function validate161(
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
        !validate94(data.postStart, {
          instancePath: instancePath + '/postStart',
          parentData: data,
          parentDataProperty: 'postStart',
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
    if (data.preStop !== undefined) {
      if (
        !validate94(data.preStop, {
          instancePath: instancePath + '/preStop',
          parentData: data,
          parentDataProperty: 'preStop',
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
  validate161.errors = vErrors;
  return errors === 0;
}
const schema43 = {
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
  type: 'object',
  nullable: true,
};
const schema44 = {
  properties: {
    port: {
      $ref: 'ppOMqvYEA3GSH3ozhOJ2Wta6ImWhzC9DOYsjidshCYo',
    },
    service: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  required: ['port'],
  type: 'object',
  nullable: true,
};
function validate121(
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
        !validate62(data.port, {
          instancePath: instancePath + '/port',
          parentData: data,
          parentDataProperty: 'port',
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
    if (data.service !== undefined) {
      if (
        !validate85(data.service, {
          instancePath: instancePath + '/service',
          parentData: data,
          parentDataProperty: 'service',
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
  }
  validate121.errors = vErrors;
  return errors === 0;
}
function validate118(
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
        !validate95(data.exec, {
          instancePath: instancePath + '/exec',
          parentData: data,
          parentDataProperty: 'exec',
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
    if (data.failureThreshold !== undefined) {
      if (
        !validate21(data.failureThreshold, {
          instancePath: instancePath + '/failureThreshold',
          parentData: data,
          parentDataProperty: 'failureThreshold',
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
    if (data.grpc !== undefined) {
      if (
        !validate121(data.grpc, {
          instancePath: instancePath + '/grpc',
          parentData: data,
          parentDataProperty: 'grpc',
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
    if (data.httpGet !== undefined) {
      if (
        !validate98(data.httpGet, {
          instancePath: instancePath + '/httpGet',
          parentData: data,
          parentDataProperty: 'httpGet',
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
    if (data.initialDelaySeconds !== undefined) {
      if (
        !validate21(data.initialDelaySeconds, {
          instancePath: instancePath + '/initialDelaySeconds',
          parentData: data,
          parentDataProperty: 'initialDelaySeconds',
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
    if (data.periodSeconds !== undefined) {
      if (
        !validate21(data.periodSeconds, {
          instancePath: instancePath + '/periodSeconds',
          parentData: data,
          parentDataProperty: 'periodSeconds',
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
    if (data.successThreshold !== undefined) {
      if (
        !validate21(data.successThreshold, {
          instancePath: instancePath + '/successThreshold',
          parentData: data,
          parentDataProperty: 'successThreshold',
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
    if (data.tcpSocket !== undefined) {
      if (
        !validate114(data.tcpSocket, {
          instancePath: instancePath + '/tcpSocket',
          parentData: data,
          parentDataProperty: 'tcpSocket',
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
    if (data.terminationGracePeriodSeconds !== undefined) {
      if (
        !validate61(data.terminationGracePeriodSeconds, {
          instancePath: instancePath + '/terminationGracePeriodSeconds',
          parentData: data,
          parentDataProperty: 'terminationGracePeriodSeconds',
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
    if (data.timeoutSeconds !== undefined) {
      if (
        !validate21(data.timeoutSeconds, {
          instancePath: instancePath + '/timeoutSeconds',
          parentData: data,
          parentDataProperty: 'timeoutSeconds',
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
  validate118.errors = vErrors;
  return errors === 0;
}
const schema55 = {
  items: {
    $ref: 'WxMipWUqqSfo29Ftt21K0qdNOM8gEudjMjxXtvA',
  },
  type: 'array',
  nullable: true,
};
const schema56 = {
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
  required: ['containerPort'],
  type: 'object',
};
const schema57 = {
  default: 'TCP',
  type: 'string',
  nullable: true,
};
function validate170(
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
  validate170.errors = vErrors;
  return errors === 0;
}
function validate165(
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
        !validate62(data.containerPort, {
          instancePath: instancePath + '/containerPort',
          parentData: data,
          parentDataProperty: 'containerPort',
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
    if (data.hostIP !== undefined) {
      if (
        !validate51(data.hostIP, {
          instancePath: instancePath + '/hostIP',
          parentData: data,
          parentDataProperty: 'hostIP',
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
    if (data.hostPort !== undefined) {
      if (
        !validate21(data.hostPort, {
          instancePath: instancePath + '/hostPort',
          parentData: data,
          parentDataProperty: 'hostPort',
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
        !validate51(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.protocol !== undefined) {
      if (
        !validate170(data.protocol, {
          instancePath: instancePath + '/protocol',
          parentData: data,
          parentDataProperty: 'protocol',
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
  validate165.errors = vErrors;
  return errors === 0;
}
function validate164(
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
        !validate165(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate164.errors = vErrors;
  return errors === 0;
}
const schema58 = {
  items: {
    $ref: 'py5O7Ijenwl6ADj0winHxKN3Jkr54XSAOEcDPZUos',
  },
  type: 'array',
  nullable: true,
};
const schema59 = {
  properties: {
    resourceName: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    restartPolicy: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['resourceName', 'restartPolicy'],
  type: 'object',
};
function validate174(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.resourceName === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'resourceName',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.restartPolicy === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'restartPolicy',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.resourceName !== undefined) {
      if (
        !validate22(data.resourceName, {
          instancePath: instancePath + '/resourceName',
          parentData: data,
          parentDataProperty: 'resourceName',
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
const schema60 = {
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
const schema61 = {
  items: {
    $ref: 'AwkkZ61h6562D626cMlZ0eonIy4nzzzpxlRBdh0XM',
  },
  type: 'array',
  nullable: true,
};
const schema62 = {
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
function validate180(
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
    if (data.request !== undefined) {
      if (
        !validate51(data.request, {
          instancePath: instancePath + '/request',
          parentData: data,
          parentDataProperty: 'request',
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
  validate180.errors = vErrors;
  return errors === 0;
}
function validate179(
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
        !validate180(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate180.errors
            : vErrors.concat(validate180.errors);
        errors = vErrors.length;
      }
    }
  }
  validate179.errors = vErrors;
  return errors === 0;
}
const schema45 = {
  additionalProperties: {
    $ref: 'l7oaIcmo24pLi7XxCQ3euA6o54Bu2nt1fJ44v0vO04',
  },
  type: 'object',
  properties: {},
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
  validate132.errors = vErrors;
  return errors === 0;
}
function validate178(
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
        !validate179(data.claims, {
          instancePath: instancePath + '/claims',
          parentData: data,
          parentDataProperty: 'claims',
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
    if (data.limits !== undefined) {
      if (
        !validate132(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate132(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate178.errors = vErrors;
  return errors === 0;
}
const schema63 = {
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
  type: 'object',
  nullable: true,
};
const schema46 = {
  properties: {
    localhostProfile: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    type: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['type'],
  type: 'object',
  nullable: true,
};
function validate134(
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
        !validate51(data.localhostProfile, {
          instancePath: instancePath + '/localhostProfile',
          parentData: data,
          parentDataProperty: 'localhostProfile',
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
  validate134.errors = vErrors;
  return errors === 0;
}
const schema64 = {
  properties: {
    add: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    drop: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  type: 'object',
  nullable: true,
};
function validate190(
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
        !validate39(data.add, {
          instancePath: instancePath + '/add',
          parentData: data,
          parentDataProperty: 'add',
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
    if (data.drop !== undefined) {
      if (
        !validate39(data.drop, {
          instancePath: instancePath + '/drop',
          parentData: data,
          parentDataProperty: 'drop',
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
  validate190.errors = vErrors;
  return errors === 0;
}
const schema65 = {
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
  type: 'object',
  nullable: true,
};
function validate200(
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
        !validate51(data.level, {
          instancePath: instancePath + '/level',
          parentData: data,
          parentDataProperty: 'level',
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
    if (data.role !== undefined) {
      if (
        !validate51(data.role, {
          instancePath: instancePath + '/role',
          parentData: data,
          parentDataProperty: 'role',
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
    if (data.type !== undefined) {
      if (
        !validate51(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
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
    if (data.user !== undefined) {
      if (
        !validate51(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
  validate200.errors = vErrors;
  return errors === 0;
}
const schema66 = {
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
  type: 'object',
  nullable: true,
};
function validate207(
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
        !validate51(data.gmsaCredentialSpec, {
          instancePath: instancePath + '/gmsaCredentialSpec',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpec',
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
    if (data.gmsaCredentialSpecName !== undefined) {
      if (
        !validate51(data.gmsaCredentialSpecName, {
          instancePath: instancePath + '/gmsaCredentialSpecName',
          parentData: data,
          parentDataProperty: 'gmsaCredentialSpecName',
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
    if (data.hostProcess !== undefined) {
      if (
        !validate53(data.hostProcess, {
          instancePath: instancePath + '/hostProcess',
          parentData: data,
          parentDataProperty: 'hostProcess',
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
    if (data.runAsUserName !== undefined) {
      if (
        !validate51(data.runAsUserName, {
          instancePath: instancePath + '/runAsUserName',
          parentData: data,
          parentDataProperty: 'runAsUserName',
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
  validate207.errors = vErrors;
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
    if (data.allowPrivilegeEscalation !== undefined) {
      if (
        !validate53(data.allowPrivilegeEscalation, {
          instancePath: instancePath + '/allowPrivilegeEscalation',
          parentData: data,
          parentDataProperty: 'allowPrivilegeEscalation',
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
    if (data.appArmorProfile !== undefined) {
      if (
        !validate134(data.appArmorProfile, {
          instancePath: instancePath + '/appArmorProfile',
          parentData: data,
          parentDataProperty: 'appArmorProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate134.errors
            : vErrors.concat(validate134.errors);
        errors = vErrors.length;
      }
    }
    if (data.capabilities !== undefined) {
      if (
        !validate190(data.capabilities, {
          instancePath: instancePath + '/capabilities',
          parentData: data,
          parentDataProperty: 'capabilities',
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
    if (data.privileged !== undefined) {
      if (
        !validate53(data.privileged, {
          instancePath: instancePath + '/privileged',
          parentData: data,
          parentDataProperty: 'privileged',
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
    if (data.procMount !== undefined) {
      if (
        !validate51(data.procMount, {
          instancePath: instancePath + '/procMount',
          parentData: data,
          parentDataProperty: 'procMount',
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
    if (data.readOnlyRootFilesystem !== undefined) {
      if (
        !validate53(data.readOnlyRootFilesystem, {
          instancePath: instancePath + '/readOnlyRootFilesystem',
          parentData: data,
          parentDataProperty: 'readOnlyRootFilesystem',
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
    if (data.runAsGroup !== undefined) {
      if (
        !validate61(data.runAsGroup, {
          instancePath: instancePath + '/runAsGroup',
          parentData: data,
          parentDataProperty: 'runAsGroup',
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
    if (data.runAsNonRoot !== undefined) {
      if (
        !validate53(data.runAsNonRoot, {
          instancePath: instancePath + '/runAsNonRoot',
          parentData: data,
          parentDataProperty: 'runAsNonRoot',
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
    if (data.runAsUser !== undefined) {
      if (
        !validate61(data.runAsUser, {
          instancePath: instancePath + '/runAsUser',
          parentData: data,
          parentDataProperty: 'runAsUser',
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
    if (data.seLinuxOptions !== undefined) {
      if (
        !validate200(data.seLinuxOptions, {
          instancePath: instancePath + '/seLinuxOptions',
          parentData: data,
          parentDataProperty: 'seLinuxOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate200.errors
            : vErrors.concat(validate200.errors);
        errors = vErrors.length;
      }
    }
    if (data.seccompProfile !== undefined) {
      if (
        !validate134(data.seccompProfile, {
          instancePath: instancePath + '/seccompProfile',
          parentData: data,
          parentDataProperty: 'seccompProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate134.errors
            : vErrors.concat(validate134.errors);
        errors = vErrors.length;
      }
    }
    if (data.windowsOptions !== undefined) {
      if (
        !validate207(data.windowsOptions, {
          instancePath: instancePath + '/windowsOptions',
          parentData: data,
          parentDataProperty: 'windowsOptions',
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
  validate187.errors = vErrors;
  return errors === 0;
}
const schema67 = {
  items: {
    $ref: 'RyMynCzjYAPHCEQqWFiO4dTDXuIMC11XbOjI4iorY',
  },
  type: 'array',
  nullable: true,
};
const schema68 = {
  properties: {
    devicePath: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['devicePath', 'name'],
  type: 'object',
};
function validate214(
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
        !validate22(data.devicePath, {
          instancePath: instancePath + '/devicePath',
          parentData: data,
          parentDataProperty: 'devicePath',
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
const schema69 = {
  items: {
    $ref: 'SEp18EkqjgXWMJk6uDMmapPUotqVJbrnxhdiX2GuEY',
  },
  type: 'array',
  nullable: true,
};
const schema70 = {
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
function validate219(
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
        !validate51(data.mountPropagation, {
          instancePath: instancePath + '/mountPropagation',
          parentData: data,
          parentDataProperty: 'mountPropagation',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.recursiveReadOnly !== undefined) {
      if (
        !validate51(data.recursiveReadOnly, {
          instancePath: instancePath + '/recursiveReadOnly',
          parentData: data,
          parentDataProperty: 'recursiveReadOnly',
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
    if (data.subPath !== undefined) {
      if (
        !validate51(data.subPath, {
          instancePath: instancePath + '/subPath',
          parentData: data,
          parentDataProperty: 'subPath',
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
    if (data.subPathExpr !== undefined) {
      if (
        !validate51(data.subPathExpr, {
          instancePath: instancePath + '/subPathExpr',
          parentData: data,
          parentDataProperty: 'subPathExpr',
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
  validate219.errors = vErrors;
  return errors === 0;
}
function validate218(
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
        !validate219(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate218.errors = vErrors;
  return errors === 0;
}
function validate228(
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
        !validate39(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate39(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
        !validate137(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.envFrom !== undefined) {
      if (
        !validate155(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.image !== undefined) {
      if (
        !validate51(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate51(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.lifecycle !== undefined) {
      if (
        !validate161(data.lifecycle, {
          instancePath: instancePath + '/lifecycle',
          parentData: data,
          parentDataProperty: 'lifecycle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate161.errors
            : vErrors.concat(validate161.errors);
        errors = vErrors.length;
      }
    }
    if (data.livenessProbe !== undefined) {
      if (
        !validate118(data.livenessProbe, {
          instancePath: instancePath + '/livenessProbe',
          parentData: data,
          parentDataProperty: 'livenessProbe',
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
    if (data.ports !== undefined) {
      if (
        !validate164(data.ports, {
          instancePath: instancePath + '/ports',
          parentData: data,
          parentDataProperty: 'ports',
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
    if (data.readinessProbe !== undefined) {
      if (
        !validate118(data.readinessProbe, {
          instancePath: instancePath + '/readinessProbe',
          parentData: data,
          parentDataProperty: 'readinessProbe',
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
    if (data.resizePolicy !== undefined) {
      if (
        !validate173(data.resizePolicy, {
          instancePath: instancePath + '/resizePolicy',
          parentData: data,
          parentDataProperty: 'resizePolicy',
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
    if (data.resources !== undefined) {
      if (
        !validate178(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate178.errors
            : vErrors.concat(validate178.errors);
        errors = vErrors.length;
      }
    }
    if (data.restartPolicy !== undefined) {
      if (
        !validate51(data.restartPolicy, {
          instancePath: instancePath + '/restartPolicy',
          parentData: data,
          parentDataProperty: 'restartPolicy',
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
    if (data.securityContext !== undefined) {
      if (
        !validate187(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
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
    if (data.startupProbe !== undefined) {
      if (
        !validate118(data.startupProbe, {
          instancePath: instancePath + '/startupProbe',
          parentData: data,
          parentDataProperty: 'startupProbe',
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
    if (data.stdin !== undefined) {
      if (
        !validate53(data.stdin, {
          instancePath: instancePath + '/stdin',
          parentData: data,
          parentDataProperty: 'stdin',
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
    if (data.stdinOnce !== undefined) {
      if (
        !validate53(data.stdinOnce, {
          instancePath: instancePath + '/stdinOnce',
          parentData: data,
          parentDataProperty: 'stdinOnce',
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
    if (data.terminationMessagePath !== undefined) {
      if (
        !validate51(data.terminationMessagePath, {
          instancePath: instancePath + '/terminationMessagePath',
          parentData: data,
          parentDataProperty: 'terminationMessagePath',
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
    if (data.terminationMessagePolicy !== undefined) {
      if (
        !validate51(data.terminationMessagePolicy, {
          instancePath: instancePath + '/terminationMessagePolicy',
          parentData: data,
          parentDataProperty: 'terminationMessagePolicy',
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
    if (data.tty !== undefined) {
      if (
        !validate53(data.tty, {
          instancePath: instancePath + '/tty',
          parentData: data,
          parentDataProperty: 'tty',
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate213(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate218(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
    if (data.workingDir !== undefined) {
      if (
        !validate51(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
  validate228.errors = vErrors;
  return errors === 0;
}
function validate444(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (
        !validate228(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate228.errors
            : vErrors.concat(validate228.errors);
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
  validate444.errors = vErrors;
  return errors === 0;
}
const schema138 = {
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
  type: 'object',
  nullable: true,
};
const schema139 = {
  items: {
    $ref: 'sWfncG59c1XfNxmkMXW89j5rdj0YnP54Zpfo5QkH10',
  },
  type: 'array',
  nullable: true,
};
const schema140 = {
  properties: {
    name: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    value: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  type: 'object',
};
function validate450(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate51(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.value !== undefined) {
      if (
        !validate51(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
function validate447(
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
        !validate39(data.nameservers, {
          instancePath: instancePath + '/nameservers',
          parentData: data,
          parentDataProperty: 'nameservers',
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
    if (data.options !== undefined) {
      if (
        !validate449(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
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
    if (data.searches !== undefined) {
      if (
        !validate39(data.searches, {
          instancePath: instancePath + '/searches',
          parentData: data,
          parentDataProperty: 'searches',
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
  validate447.errors = vErrors;
  return errors === 0;
}
const schema141 = {
  items: {
    $ref: 'AUnQKLwJz6rruxkPqRuJvD0YcTfp6ZAUevZLKyXBQ',
  },
  type: 'array',
  nullable: true,
};
const schema142 = {
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
    resizePolicy: {
      $ref: '6GSWrpaVmXpudv48RvtoxAgwJVMPod1ZDpz48dxmpTE',
    },
    resources: {
      $ref: 'I6Wvk1dBJbCLDtTTd1wo67bjd19cYqY1OawTE5INko',
    },
    restartPolicy: {
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
    targetContainerName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
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
  },
  required: ['name'],
  type: 'object',
};
function validate460(
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
        !validate39(data.args, {
          instancePath: instancePath + '/args',
          parentData: data,
          parentDataProperty: 'args',
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
    if (data.command !== undefined) {
      if (
        !validate39(data.command, {
          instancePath: instancePath + '/command',
          parentData: data,
          parentDataProperty: 'command',
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
        !validate137(data.env, {
          instancePath: instancePath + '/env',
          parentData: data,
          parentDataProperty: 'env',
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
    if (data.envFrom !== undefined) {
      if (
        !validate155(data.envFrom, {
          instancePath: instancePath + '/envFrom',
          parentData: data,
          parentDataProperty: 'envFrom',
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
    if (data.image !== undefined) {
      if (
        !validate51(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
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
    if (data.imagePullPolicy !== undefined) {
      if (
        !validate51(data.imagePullPolicy, {
          instancePath: instancePath + '/imagePullPolicy',
          parentData: data,
          parentDataProperty: 'imagePullPolicy',
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
    if (data.lifecycle !== undefined) {
      if (
        !validate161(data.lifecycle, {
          instancePath: instancePath + '/lifecycle',
          parentData: data,
          parentDataProperty: 'lifecycle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate161.errors
            : vErrors.concat(validate161.errors);
        errors = vErrors.length;
      }
    }
    if (data.livenessProbe !== undefined) {
      if (
        !validate118(data.livenessProbe, {
          instancePath: instancePath + '/livenessProbe',
          parentData: data,
          parentDataProperty: 'livenessProbe',
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
    if (data.ports !== undefined) {
      if (
        !validate164(data.ports, {
          instancePath: instancePath + '/ports',
          parentData: data,
          parentDataProperty: 'ports',
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
    if (data.readinessProbe !== undefined) {
      if (
        !validate118(data.readinessProbe, {
          instancePath: instancePath + '/readinessProbe',
          parentData: data,
          parentDataProperty: 'readinessProbe',
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
    if (data.resizePolicy !== undefined) {
      if (
        !validate173(data.resizePolicy, {
          instancePath: instancePath + '/resizePolicy',
          parentData: data,
          parentDataProperty: 'resizePolicy',
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
    if (data.resources !== undefined) {
      if (
        !validate178(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate178.errors
            : vErrors.concat(validate178.errors);
        errors = vErrors.length;
      }
    }
    if (data.restartPolicy !== undefined) {
      if (
        !validate51(data.restartPolicy, {
          instancePath: instancePath + '/restartPolicy',
          parentData: data,
          parentDataProperty: 'restartPolicy',
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
    if (data.securityContext !== undefined) {
      if (
        !validate187(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
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
    if (data.startupProbe !== undefined) {
      if (
        !validate118(data.startupProbe, {
          instancePath: instancePath + '/startupProbe',
          parentData: data,
          parentDataProperty: 'startupProbe',
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
    if (data.stdin !== undefined) {
      if (
        !validate53(data.stdin, {
          instancePath: instancePath + '/stdin',
          parentData: data,
          parentDataProperty: 'stdin',
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
    if (data.stdinOnce !== undefined) {
      if (
        !validate53(data.stdinOnce, {
          instancePath: instancePath + '/stdinOnce',
          parentData: data,
          parentDataProperty: 'stdinOnce',
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
    if (data.targetContainerName !== undefined) {
      if (
        !validate51(data.targetContainerName, {
          instancePath: instancePath + '/targetContainerName',
          parentData: data,
          parentDataProperty: 'targetContainerName',
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
    if (data.terminationMessagePath !== undefined) {
      if (
        !validate51(data.terminationMessagePath, {
          instancePath: instancePath + '/terminationMessagePath',
          parentData: data,
          parentDataProperty: 'terminationMessagePath',
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
    if (data.terminationMessagePolicy !== undefined) {
      if (
        !validate51(data.terminationMessagePolicy, {
          instancePath: instancePath + '/terminationMessagePolicy',
          parentData: data,
          parentDataProperty: 'terminationMessagePolicy',
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
    if (data.tty !== undefined) {
      if (
        !validate53(data.tty, {
          instancePath: instancePath + '/tty',
          parentData: data,
          parentDataProperty: 'tty',
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
    if (data.volumeDevices !== undefined) {
      if (
        !validate213(data.volumeDevices, {
          instancePath: instancePath + '/volumeDevices',
          parentData: data,
          parentDataProperty: 'volumeDevices',
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
    if (data.volumeMounts !== undefined) {
      if (
        !validate218(data.volumeMounts, {
          instancePath: instancePath + '/volumeMounts',
          parentData: data,
          parentDataProperty: 'volumeMounts',
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
    if (data.workingDir !== undefined) {
      if (
        !validate51(data.workingDir, {
          instancePath: instancePath + '/workingDir',
          parentData: data,
          parentDataProperty: 'workingDir',
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
  validate460.errors = vErrors;
  return errors === 0;
}
function validate459(
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
        !validate460(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate460.errors
            : vErrors.concat(validate460.errors);
        errors = vErrors.length;
      }
    }
  }
  validate459.errors = vErrors;
  return errors === 0;
}
const schema143 = {
  items: {
    $ref: 'IX3OlwxoKRMSjhCltCPJOVjPaBEO4EyMsvYuOuXjxQg',
  },
  type: 'array',
  nullable: true,
};
const schema144 = {
  properties: {
    hostnames: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
    ip: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['ip'],
  type: 'object',
};
function validate489(
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
        !validate39(data.hostnames, {
          instancePath: instancePath + '/hostnames',
          parentData: data,
          parentDataProperty: 'hostnames',
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
    if (data.ip !== undefined) {
      if (
        !validate22(data.ip, {
          instancePath: instancePath + '/ip',
          parentData: data,
          parentDataProperty: 'ip',
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
  validate489.errors = vErrors;
  return errors === 0;
}
function validate488(
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
        !validate489(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate489.errors
            : vErrors.concat(validate489.errors);
        errors = vErrors.length;
      }
    }
  }
  validate488.errors = vErrors;
  return errors === 0;
}
const schema145 = {
  items: {
    $ref: 'lX4IaYIZZv1DIKZ67DpEDlNr31ePF1qx2EUDHqZRM4',
  },
  type: 'array',
  nullable: true,
};
const schema80 = {
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  type: 'object',
};
function validate275(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name !== undefined) {
      if (
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  validate275.errors = vErrors;
  return errors === 0;
}
function validate499(
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
        !validate275(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate499.errors = vErrors;
  return errors === 0;
}
const schema146 = {
  items: {
    $ref: 'xYv6SPJM8Nd0O3ilEaHDD2OAb7lSkClfTH7nyqw',
  },
  type: 'array',
  nullable: true,
};
function validate502(
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
        !validate228(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate228.errors
            : vErrors.concat(validate228.errors);
        errors = vErrors.length;
      }
    }
  }
  validate502.errors = vErrors;
  return errors === 0;
}
const schema147 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['name'],
  type: 'object',
  nullable: true,
};
function validate507(
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
  }
  validate507.errors = vErrors;
  return errors === 0;
}
const schema148 = {
  items: {
    $ref: '7b4jhx4uNqXqCFn2w8NkgAjv38EtTlcang4jjJrU',
  },
  type: 'array',
  nullable: true,
};
const schema149 = {
  properties: {
    conditionType: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['conditionType'],
  type: 'object',
};
function validate515(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.conditionType === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'conditionType',
        },
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.conditionType !== undefined) {
      if (
        !validate22(data.conditionType, {
          instancePath: instancePath + '/conditionType',
          parentData: data,
          parentDataProperty: 'conditionType',
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
  validate515.errors = vErrors;
  return errors === 0;
}
function validate514(
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
        !validate515(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate515.errors
            : vErrors.concat(validate515.errors);
        errors = vErrors.length;
      }
    }
  }
  validate514.errors = vErrors;
  return errors === 0;
}
const schema150 = {
  items: {
    $ref: 'jaw9zkHQWXbeYzOL8vMmCF02tKFVoKCAc4fYHUPkeO4',
  },
  type: 'array',
  nullable: true,
};
const schema151 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
    resourceClaimName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    resourceClaimTemplateName: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
  },
  required: ['name'],
  type: 'object',
};
function validate520(
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
    if (data.resourceClaimName !== undefined) {
      if (
        !validate51(data.resourceClaimName, {
          instancePath: instancePath + '/resourceClaimName',
          parentData: data,
          parentDataProperty: 'resourceClaimName',
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
    if (data.resourceClaimTemplateName !== undefined) {
      if (
        !validate51(data.resourceClaimTemplateName, {
          instancePath: instancePath + '/resourceClaimTemplateName',
          parentData: data,
          parentDataProperty: 'resourceClaimTemplateName',
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
  validate520.errors = vErrors;
  return errors === 0;
}
function validate519(
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
        !validate520(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate520.errors
            : vErrors.concat(validate520.errors);
        errors = vErrors.length;
      }
    }
  }
  validate519.errors = vErrors;
  return errors === 0;
}
const schema152 = {
  items: {
    $ref: 'HN5PKMIdyNeW2tH5k7qzNtrzheocymAho1Vd1ZpPn9c',
  },
  type: 'array',
  nullable: true,
};
const schema153 = {
  properties: {
    name: {
      $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
    },
  },
  required: ['name'],
  type: 'object',
};
function validate531(
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
  validate531.errors = vErrors;
  return errors === 0;
}
function validate530(
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
        !validate531(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate531.errors
            : vErrors.concat(validate531.errors);
        errors = vErrors.length;
      }
    }
  }
  validate530.errors = vErrors;
  return errors === 0;
}
const schema154 = {
  properties: {
    appArmorProfile: {
      $ref: 'YbnajYi6rBqhVSaUKuHSP0DlX7N4UdiS6tIv3THy4',
    },
    fsGroup: {
      $ref: 'NW88HfrvS38u8Yy207QW6S7qFs2gsa0jBgSYGvqPw',
    },
    fsGroupChangePolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
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
    seLinuxChangePolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    seLinuxOptions: {
      $ref: 'HxCShOIxXvAeZcVxGCTBWSblLv24k535dp3HuWUtqq0',
    },
    seccompProfile: {
      $ref: 'YbnajYi6rBqhVSaUKuHSP0DlX7N4UdiS6tIv3THy4',
    },
    supplementalGroups: {
      $ref: 'Q576bBYbJ1AGPeiGBGrCfpIOdAY4EluWm7uSP5Hk',
    },
    supplementalGroupsPolicy: {
      $ref: 'GlcYMJF0EagTzhTCQIbCB22J377Z87wRm00IC2Ss2g',
    },
    sysctls: {
      $ref: 'wOtvUyP8xBMF8YvP9G2nZ7hpGeMpOckdRUXrDPgLUY',
    },
    windowsOptions: {
      $ref: 'sWfrXDJM9xHwLEX7HYTegXP1RJ5T3eXzwt07iJjKI',
    },
  },
  type: 'object',
  nullable: true,
};
const schema155 = {
  items: {
    $ref: 'icwF9bpzvIS3QxC52v2XvqrjjaZnFwyMbHUnptLeEQ',
  },
  type: 'array',
  nullable: true,
};
function validate545(
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
  validate545.errors = vErrors;
  return errors === 0;
}
function validate535(
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
    if (data.appArmorProfile !== undefined) {
      if (
        !validate134(data.appArmorProfile, {
          instancePath: instancePath + '/appArmorProfile',
          parentData: data,
          parentDataProperty: 'appArmorProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate134.errors
            : vErrors.concat(validate134.errors);
        errors = vErrors.length;
      }
    }
    if (data.fsGroup !== undefined) {
      if (
        !validate61(data.fsGroup, {
          instancePath: instancePath + '/fsGroup',
          parentData: data,
          parentDataProperty: 'fsGroup',
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
    if (data.fsGroupChangePolicy !== undefined) {
      if (
        !validate51(data.fsGroupChangePolicy, {
          instancePath: instancePath + '/fsGroupChangePolicy',
          parentData: data,
          parentDataProperty: 'fsGroupChangePolicy',
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
    if (data.runAsGroup !== undefined) {
      if (
        !validate61(data.runAsGroup, {
          instancePath: instancePath + '/runAsGroup',
          parentData: data,
          parentDataProperty: 'runAsGroup',
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
    if (data.runAsNonRoot !== undefined) {
      if (
        !validate53(data.runAsNonRoot, {
          instancePath: instancePath + '/runAsNonRoot',
          parentData: data,
          parentDataProperty: 'runAsNonRoot',
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
    if (data.runAsUser !== undefined) {
      if (
        !validate61(data.runAsUser, {
          instancePath: instancePath + '/runAsUser',
          parentData: data,
          parentDataProperty: 'runAsUser',
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
    if (data.seLinuxChangePolicy !== undefined) {
      if (
        !validate51(data.seLinuxChangePolicy, {
          instancePath: instancePath + '/seLinuxChangePolicy',
          parentData: data,
          parentDataProperty: 'seLinuxChangePolicy',
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
    if (data.seLinuxOptions !== undefined) {
      if (
        !validate200(data.seLinuxOptions, {
          instancePath: instancePath + '/seLinuxOptions',
          parentData: data,
          parentDataProperty: 'seLinuxOptions',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate200.errors
            : vErrors.concat(validate200.errors);
        errors = vErrors.length;
      }
    }
    if (data.seccompProfile !== undefined) {
      if (
        !validate134(data.seccompProfile, {
          instancePath: instancePath + '/seccompProfile',
          parentData: data,
          parentDataProperty: 'seccompProfile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate134.errors
            : vErrors.concat(validate134.errors);
        errors = vErrors.length;
      }
    }
    if (data.supplementalGroups !== undefined) {
      if (
        !validate545(data.supplementalGroups, {
          instancePath: instancePath + '/supplementalGroups',
          parentData: data,
          parentDataProperty: 'supplementalGroups',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate545.errors
            : vErrors.concat(validate545.errors);
        errors = vErrors.length;
      }
    }
    if (data.supplementalGroupsPolicy !== undefined) {
      if (
        !validate51(data.supplementalGroupsPolicy, {
          instancePath: instancePath + '/supplementalGroupsPolicy',
          parentData: data,
          parentDataProperty: 'supplementalGroupsPolicy',
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
    if (data.sysctls !== undefined) {
      if (
        !validate100(data.sysctls, {
          instancePath: instancePath + '/sysctls',
          parentData: data,
          parentDataProperty: 'sysctls',
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
    if (data.windowsOptions !== undefined) {
      if (
        !validate207(data.windowsOptions, {
          instancePath: instancePath + '/windowsOptions',
          parentData: data,
          parentDataProperty: 'windowsOptions',
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
  validate535.errors = vErrors;
  return errors === 0;
}
const schema156 = {
  items: {
    $ref: 'Me3dAzCevo9JgluOcBf4PX5XcjXOHICBlAsWQglc',
  },
  type: 'array',
  nullable: true,
};
const schema157 = {
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
function validate559(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.effect !== undefined) {
      if (
        !validate51(data.effect, {
          instancePath: instancePath + '/effect',
          parentData: data,
          parentDataProperty: 'effect',
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
    if (data.key !== undefined) {
      if (
        !validate51(data.key, {
          instancePath: instancePath + '/key',
          parentData: data,
          parentDataProperty: 'key',
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
    if (data.operator !== undefined) {
      if (
        !validate51(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
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
    if (data.tolerationSeconds !== undefined) {
      if (
        !validate61(data.tolerationSeconds, {
          instancePath: instancePath + '/tolerationSeconds',
          parentData: data,
          parentDataProperty: 'tolerationSeconds',
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
    if (data.value !== undefined) {
      if (
        !validate51(data.value, {
          instancePath: instancePath + '/value',
          parentData: data,
          parentDataProperty: 'value',
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
  validate559.errors = vErrors;
  return errors === 0;
}
function validate558(
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
        !validate559(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate559.errors
            : vErrors.concat(validate559.errors);
        errors = vErrors.length;
      }
    }
  }
  validate558.errors = vErrors;
  return errors === 0;
}
const schema158 = {
  items: {
    $ref: 'PMEoIw3F1IPZaI9o7ckqeodb7BJ6q7Y2F6PDUm9sk',
  },
  type: 'array',
  nullable: true,
};
const schema159 = {
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
  required: ['maxSkew', 'topologyKey', 'whenUnsatisfiable'],
  type: 'object',
};
function validate568(
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
        !validate34(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
    if (data.matchLabelKeys !== undefined) {
      if (
        !validate39(data.matchLabelKeys, {
          instancePath: instancePath + '/matchLabelKeys',
          parentData: data,
          parentDataProperty: 'matchLabelKeys',
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
    if (data.maxSkew !== undefined) {
      if (
        !validate62(data.maxSkew, {
          instancePath: instancePath + '/maxSkew',
          parentData: data,
          parentDataProperty: 'maxSkew',
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
    if (data.minDomains !== undefined) {
      if (
        !validate21(data.minDomains, {
          instancePath: instancePath + '/minDomains',
          parentData: data,
          parentDataProperty: 'minDomains',
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
    if (data.nodeAffinityPolicy !== undefined) {
      if (
        !validate51(data.nodeAffinityPolicy, {
          instancePath: instancePath + '/nodeAffinityPolicy',
          parentData: data,
          parentDataProperty: 'nodeAffinityPolicy',
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
    if (data.nodeTaintsPolicy !== undefined) {
      if (
        !validate51(data.nodeTaintsPolicy, {
          instancePath: instancePath + '/nodeTaintsPolicy',
          parentData: data,
          parentDataProperty: 'nodeTaintsPolicy',
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
    if (data.topologyKey !== undefined) {
      if (
        !validate22(data.topologyKey, {
          instancePath: instancePath + '/topologyKey',
          parentData: data,
          parentDataProperty: 'topologyKey',
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
    if (data.whenUnsatisfiable !== undefined) {
      if (
        !validate22(data.whenUnsatisfiable, {
          instancePath: instancePath + '/whenUnsatisfiable',
          parentData: data,
          parentDataProperty: 'whenUnsatisfiable',
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
  validate568.errors = vErrors;
  return errors === 0;
}
function validate567(
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
        !validate568(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate568.errors
            : vErrors.concat(validate568.errors);
        errors = vErrors.length;
      }
    }
  }
  validate567.errors = vErrors;
  return errors === 0;
}
const schema160 = {
  items: {
    $ref: 'I8Qqp0YecATkXXlyfdSICIr5OCNwhrwSHu8oAIBadI',
  },
  type: 'array',
  nullable: true,
};
const schema161 = {
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
const schema162 = {
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
function validate581(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.partition !== undefined) {
      if (
        !validate21(data.partition, {
          instancePath: instancePath + '/partition',
          parentData: data,
          parentDataProperty: 'partition',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
        !validate22(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate581.errors = vErrors;
  return errors === 0;
}
const schema163 = {
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
const schema164 = {
  default: 'ext4',
  type: 'string',
  nullable: true,
};
function validate591(
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
  validate591.errors = vErrors;
  return errors === 0;
}
function validate587(
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
        !validate51(data.cachingMode, {
          instancePath: instancePath + '/cachingMode',
          parentData: data,
          parentDataProperty: 'cachingMode',
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
    if (data.diskName !== undefined) {
      if (
        !validate22(data.diskName, {
          instancePath: instancePath + '/diskName',
          parentData: data,
          parentDataProperty: 'diskName',
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
    if (data.diskURI !== undefined) {
      if (
        !validate22(data.diskURI, {
          instancePath: instancePath + '/diskURI',
          parentData: data,
          parentDataProperty: 'diskURI',
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
    if (data.fsType !== undefined) {
      if (
        !validate591(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate591.errors
            : vErrors.concat(validate591.errors);
        errors = vErrors.length;
      }
    }
    if (data.kind !== undefined) {
      if (
        !validate51(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
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
    if (data.readOnly !== undefined) {
      if (
        !validate253(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  }
  validate587.errors = vErrors;
  return errors === 0;
}
const schema165 = {
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
function validate596(
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.shareName !== undefined) {
      if (
        !validate22(data.shareName, {
          instancePath: instancePath + '/shareName',
          parentData: data,
          parentDataProperty: 'shareName',
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
  validate596.errors = vErrors;
  return errors === 0;
}
const schema166 = {
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
const schema79 = {
  items: {
    $ref: 'jdFtv6DGtroqVatkuk8ipQtGFLMzfSuVek97sB0uauQ',
  },
  type: 'array',
};
function validate273(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
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
  validate273.errors = vErrors;
  return errors === 0;
}
const schema73 = {
  properties: {
    name: {
      $ref: 'ylFKgRADFnj8zsAqNcbZrvIOQI64FUWlOFS2V8uyo',
    },
  },
  type: 'object',
  nullable: true,
};
function validate254(
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
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
  }
  validate254.errors = vErrors;
  return errors === 0;
}
function validate601(
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
        !validate273(data.monitors, {
          instancePath: instancePath + '/monitors',
          parentData: data,
          parentDataProperty: 'monitors',
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
    if (data.path !== undefined) {
      if (
        !validate51(data.path, {
          instancePath: instancePath + '/path',
          parentData: data,
          parentDataProperty: 'path',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretFile !== undefined) {
      if (
        !validate51(data.secretFile, {
          instancePath: instancePath + '/secretFile',
          parentData: data,
          parentDataProperty: 'secretFile',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.user !== undefined) {
      if (
        !validate51(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
  validate601.errors = vErrors;
  return errors === 0;
}
const schema167 = {
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
function validate609(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.volumeID !== undefined) {
      if (
        !validate22(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate609.errors = vErrors;
  return errors === 0;
}
const schema168 = {
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
const schema74 = {
  items: {
    $ref: 'KZm4JRWtb68G65niEVa35cCfAyEYRWGkoaumd8EY',
  },
  type: 'array',
  nullable: true,
};
const schema75 = {
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
function validate257(
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
    if (data.mode !== undefined) {
      if (
        !validate21(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
  validate257.errors = vErrors;
  return errors === 0;
}
function validate256(
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
        !validate257(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate256.errors = vErrors;
  return errors === 0;
}
function validate615(
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
        !validate21(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate256(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate256.errors
            : vErrors.concat(validate256.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate615.errors = vErrors;
  return errors === 0;
}
const schema169 = {
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
function validate621(
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
        !validate22(data.driver, {
          instancePath: instancePath + '/driver',
          parentData: data,
          parentDataProperty: 'driver',
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
    if (data.fsType !== undefined) {
      if (
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.nodePublishSecretRef !== undefined) {
      if (
        !validate254(data.nodePublishSecretRef, {
          instancePath: instancePath + '/nodePublishSecretRef',
          parentData: data,
          parentDataProperty: 'nodePublishSecretRef',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.volumeAttributes !== undefined) {
      if (
        !validate44(data.volumeAttributes, {
          instancePath: instancePath + '/volumeAttributes',
          parentData: data,
          parentDataProperty: 'volumeAttributes',
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
  }
  validate621.errors = vErrors;
  return errors === 0;
}
const schema170 = {
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
const schema76 = {
  items: {
    $ref: '83t6EKcTjvzxVMR8ob3sMZu0lIqxm1azYctskfY5Ks4',
  },
  type: 'array',
  nullable: true,
};
const schema77 = {
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
function validate263(
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
        !validate143(data.fieldRef, {
          instancePath: instancePath + '/fieldRef',
          parentData: data,
          parentDataProperty: 'fieldRef',
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
    if (data.mode !== undefined) {
      if (
        !validate21(data.mode, {
          instancePath: instancePath + '/mode',
          parentData: data,
          parentDataProperty: 'mode',
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
    if (data.resourceFieldRef !== undefined) {
      if (
        !validate147(data.resourceFieldRef, {
          instancePath: instancePath + '/resourceFieldRef',
          parentData: data,
          parentDataProperty: 'resourceFieldRef',
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
  validate263.errors = vErrors;
  return errors === 0;
}
function validate262(
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
        !validate263(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate262.errors = vErrors;
  return errors === 0;
}
function validate628(
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
        !validate21(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate262(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate262.errors
            : vErrors.concat(validate262.errors);
        errors = vErrors.length;
      }
    }
  }
  validate628.errors = vErrors;
  return errors === 0;
}
const schema171 = {
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
function validate632(
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
        !validate51(data.medium, {
          instancePath: instancePath + '/medium',
          parentData: data,
          parentDataProperty: 'medium',
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
  validate632.errors = vErrors;
  return errors === 0;
}
const schema172 = {
  properties: {
    volumeClaimTemplate: {
      $ref: 'g1Rr4sNcApDruYkFNXbkPV7gMx4KUKxqFl8Y5kCQ0g',
    },
  },
  type: 'object',
  nullable: true,
};
const schema173 = {
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
const schema174 = {
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
const schema175 = {
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
function validate641(
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
        !validate51(data.apiGroup, {
          instancePath: instancePath + '/apiGroup',
          parentData: data,
          parentDataProperty: 'apiGroup',
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
  }
  validate641.errors = vErrors;
  return errors === 0;
}
const schema176 = {
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
function validate646(
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
        !validate51(data.apiGroup, {
          instancePath: instancePath + '/apiGroup',
          parentData: data,
          parentDataProperty: 'apiGroup',
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
        !validate51(data.namespace, {
          instancePath: instancePath + '/namespace',
          parentData: data,
          parentDataProperty: 'namespace',
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
  validate646.errors = vErrors;
  return errors === 0;
}
const schema177 = {
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
function validate652(
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
        !validate132(data.limits, {
          instancePath: instancePath + '/limits',
          parentData: data,
          parentDataProperty: 'limits',
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
    if (data.requests !== undefined) {
      if (
        !validate132(data.requests, {
          instancePath: instancePath + '/requests',
          parentData: data,
          parentDataProperty: 'requests',
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
  validate652.errors = vErrors;
  return errors === 0;
}
function validate639(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.accessModes !== undefined) {
      if (
        !validate39(data.accessModes, {
          instancePath: instancePath + '/accessModes',
          parentData: data,
          parentDataProperty: 'accessModes',
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
    if (data.dataSource !== undefined) {
      if (
        !validate641(data.dataSource, {
          instancePath: instancePath + '/dataSource',
          parentData: data,
          parentDataProperty: 'dataSource',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate641.errors
            : vErrors.concat(validate641.errors);
        errors = vErrors.length;
      }
    }
    if (data.dataSourceRef !== undefined) {
      if (
        !validate646(data.dataSourceRef, {
          instancePath: instancePath + '/dataSourceRef',
          parentData: data,
          parentDataProperty: 'dataSourceRef',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate646.errors
            : vErrors.concat(validate646.errors);
        errors = vErrors.length;
      }
    }
    if (data.resources !== undefined) {
      if (
        !validate652(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate652.errors
            : vErrors.concat(validate652.errors);
        errors = vErrors.length;
      }
    }
    if (data.selector !== undefined) {
      if (
        !validate34(data.selector, {
          instancePath: instancePath + '/selector',
          parentData: data,
          parentDataProperty: 'selector',
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
    if (data.storageClassName !== undefined) {
      if (
        !validate51(data.storageClassName, {
          instancePath: instancePath + '/storageClassName',
          parentData: data,
          parentDataProperty: 'storageClassName',
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
    if (data.volumeAttributesClassName !== undefined) {
      if (
        !validate51(data.volumeAttributesClassName, {
          instancePath: instancePath + '/volumeAttributesClassName',
          parentData: data,
          parentDataProperty: 'volumeAttributesClassName',
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
    if (data.volumeMode !== undefined) {
      if (
        !validate51(data.volumeMode, {
          instancePath: instancePath + '/volumeMode',
          parentData: data,
          parentDataProperty: 'volumeMode',
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
    if (data.volumeName !== undefined) {
      if (
        !validate51(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
  validate639.errors = vErrors;
  return errors === 0;
}
function validate637(
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
        !validate55(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate639(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate639.errors
            : vErrors.concat(validate639.errors);
        errors = vErrors.length;
      }
    }
  }
  validate637.errors = vErrors;
  return errors === 0;
}
function validate636(
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
        !validate637(data.volumeClaimTemplate, {
          instancePath: instancePath + '/volumeClaimTemplate',
          parentData: data,
          parentDataProperty: 'volumeClaimTemplate',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate637.errors
            : vErrors.concat(validate637.errors);
        errors = vErrors.length;
      }
    }
  }
  validate636.errors = vErrors;
  return errors === 0;
}
const schema178 = {
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
function validate664(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.lun !== undefined) {
      if (
        !validate21(data.lun, {
          instancePath: instancePath + '/lun',
          parentData: data,
          parentDataProperty: 'lun',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.targetWWNs !== undefined) {
      if (
        !validate39(data.targetWWNs, {
          instancePath: instancePath + '/targetWWNs',
          parentData: data,
          parentDataProperty: 'targetWWNs',
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
    if (data.wwids !== undefined) {
      if (
        !validate39(data.wwids, {
          instancePath: instancePath + '/wwids',
          parentData: data,
          parentDataProperty: 'wwids',
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
  validate664.errors = vErrors;
  return errors === 0;
}
const schema179 = {
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
function validate671(
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
        !validate22(data.driver, {
          instancePath: instancePath + '/driver',
          parentData: data,
          parentDataProperty: 'driver',
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
    if (data.fsType !== undefined) {
      if (
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.options !== undefined) {
      if (
        !validate44(data.options, {
          instancePath: instancePath + '/options',
          parentData: data,
          parentDataProperty: 'options',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
  validate671.errors = vErrors;
  return errors === 0;
}
const schema180 = {
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
function validate678(
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
        !validate51(data.datasetName, {
          instancePath: instancePath + '/datasetName',
          parentData: data,
          parentDataProperty: 'datasetName',
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
    if (data.datasetUUID !== undefined) {
      if (
        !validate51(data.datasetUUID, {
          instancePath: instancePath + '/datasetUUID',
          parentData: data,
          parentDataProperty: 'datasetUUID',
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
  validate678.errors = vErrors;
  return errors === 0;
}
const schema181 = {
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
function validate682(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.partition !== undefined) {
      if (
        !validate21(data.partition, {
          instancePath: instancePath + '/partition',
          parentData: data,
          parentDataProperty: 'partition',
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
    if (data.pdName !== undefined) {
      if (
        !validate22(data.pdName, {
          instancePath: instancePath + '/pdName',
          parentData: data,
          parentDataProperty: 'pdName',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate682.errors = vErrors;
  return errors === 0;
}
const schema182 = {
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
function validate688(
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
        !validate51(data.directory, {
          instancePath: instancePath + '/directory',
          parentData: data,
          parentDataProperty: 'directory',
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
    if (data.repository !== undefined) {
      if (
        !validate22(data.repository, {
          instancePath: instancePath + '/repository',
          parentData: data,
          parentDataProperty: 'repository',
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
    if (data.revision !== undefined) {
      if (
        !validate51(data.revision, {
          instancePath: instancePath + '/revision',
          parentData: data,
          parentDataProperty: 'revision',
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
  validate688.errors = vErrors;
  return errors === 0;
}
const schema183 = {
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
function validate693(
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
        !validate22(data.endpoints, {
          instancePath: instancePath + '/endpoints',
          parentData: data,
          parentDataProperty: 'endpoints',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate693.errors = vErrors;
  return errors === 0;
}
const schema184 = {
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
function validate698(
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
    if (data.type !== undefined) {
      if (
        !validate51(data.type, {
          instancePath: instancePath + '/type',
          parentData: data,
          parentDataProperty: 'type',
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
  validate698.errors = vErrors;
  return errors === 0;
}
const schema185 = {
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
function validate702(
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
        !validate51(data.pullPolicy, {
          instancePath: instancePath + '/pullPolicy',
          parentData: data,
          parentDataProperty: 'pullPolicy',
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
    if (data.reference !== undefined) {
      if (
        !validate51(data.reference, {
          instancePath: instancePath + '/reference',
          parentData: data,
          parentDataProperty: 'reference',
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
  validate702.errors = vErrors;
  return errors === 0;
}
const schema186 = {
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
const schema187 = {
  default: 'default',
  type: 'string',
  nullable: true,
};
function validate712(
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
  validate712.errors = vErrors;
  return errors === 0;
}
function validate706(
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
        !validate53(data.chapAuthDiscovery, {
          instancePath: instancePath + '/chapAuthDiscovery',
          parentData: data,
          parentDataProperty: 'chapAuthDiscovery',
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
    if (data.chapAuthSession !== undefined) {
      if (
        !validate53(data.chapAuthSession, {
          instancePath: instancePath + '/chapAuthSession',
          parentData: data,
          parentDataProperty: 'chapAuthSession',
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
    if (data.fsType !== undefined) {
      if (
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.initiatorName !== undefined) {
      if (
        !validate51(data.initiatorName, {
          instancePath: instancePath + '/initiatorName',
          parentData: data,
          parentDataProperty: 'initiatorName',
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
    if (data.iqn !== undefined) {
      if (
        !validate22(data.iqn, {
          instancePath: instancePath + '/iqn',
          parentData: data,
          parentDataProperty: 'iqn',
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
    if (data.iscsiInterface !== undefined) {
      if (
        !validate712(data.iscsiInterface, {
          instancePath: instancePath + '/iscsiInterface',
          parentData: data,
          parentDataProperty: 'iscsiInterface',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate712.errors
            : vErrors.concat(validate712.errors);
        errors = vErrors.length;
      }
    }
    if (data.lun !== undefined) {
      if (
        !validate62(data.lun, {
          instancePath: instancePath + '/lun',
          parentData: data,
          parentDataProperty: 'lun',
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
    if (data.portals !== undefined) {
      if (
        !validate39(data.portals, {
          instancePath: instancePath + '/portals',
          parentData: data,
          parentDataProperty: 'portals',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.targetPortal !== undefined) {
      if (
        !validate22(data.targetPortal, {
          instancePath: instancePath + '/targetPortal',
          parentData: data,
          parentDataProperty: 'targetPortal',
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
  validate706.errors = vErrors;
  return errors === 0;
}
const schema188 = {
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
function validate721(
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.server !== undefined) {
      if (
        !validate22(data.server, {
          instancePath: instancePath + '/server',
          parentData: data,
          parentDataProperty: 'server',
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
  validate721.errors = vErrors;
  return errors === 0;
}
const schema189 = {
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
function validate726(
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
        !validate22(data.claimName, {
          instancePath: instancePath + '/claimName',
          parentData: data,
          parentDataProperty: 'claimName',
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
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
  validate726.errors = vErrors;
  return errors === 0;
}
const schema190 = {
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
function validate730(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.pdID !== undefined) {
      if (
        !validate22(data.pdID, {
          instancePath: instancePath + '/pdID',
          parentData: data,
          parentDataProperty: 'pdID',
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
  validate730.errors = vErrors;
  return errors === 0;
}
const schema191 = {
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
function validate734(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
        !validate22(data.volumeID, {
          instancePath: instancePath + '/volumeID',
          parentData: data,
          parentDataProperty: 'volumeID',
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
  validate734.errors = vErrors;
  return errors === 0;
}
const schema192 = {
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
const schema193 = {
  items: {
    $ref: 'WICQ5kdq9kT3ygPK1xgAXHZR3qlzTXRJaybZiIbakk',
  },
  type: 'array',
  nullable: true,
};
const schema194 = {
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
const schema195 = {
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
function validate743(
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
        !validate34(data.labelSelector, {
          instancePath: instancePath + '/labelSelector',
          parentData: data,
          parentDataProperty: 'labelSelector',
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
        !validate51(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.signerName !== undefined) {
      if (
        !validate51(data.signerName, {
          instancePath: instancePath + '/signerName',
          parentData: data,
          parentDataProperty: 'signerName',
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
  validate743.errors = vErrors;
  return errors === 0;
}
const schema78 = {
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
function validate269(
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
        !validate256(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate256.errors
            : vErrors.concat(validate256.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== undefined) {
      if (
        !validate85(data.name, {
          instancePath: instancePath + '/name',
          parentData: data,
          parentDataProperty: 'name',
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
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
  validate269.errors = vErrors;
  return errors === 0;
}
const schema196 = {
  properties: {
    items: {
      $ref: 'TQHsoKhmMfGdgQZTETcM93nSDALohOZ36ZiSXicyxhU',
    },
  },
  type: 'object',
  nullable: true,
};
function validate751(
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
        !validate262(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate262.errors
            : vErrors.concat(validate262.errors);
        errors = vErrors.length;
      }
    }
  }
  validate751.errors = vErrors;
  return errors === 0;
}
const schema197 = {
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
function validate755(
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
        !validate51(data.audience, {
          instancePath: instancePath + '/audience',
          parentData: data,
          parentDataProperty: 'audience',
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
    if (data.expirationSeconds !== undefined) {
      if (
        !validate61(data.expirationSeconds, {
          instancePath: instancePath + '/expirationSeconds',
          parentData: data,
          parentDataProperty: 'expirationSeconds',
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
  validate755.errors = vErrors;
  return errors === 0;
}
function validate742(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.clusterTrustBundle !== undefined) {
      if (
        !validate743(data.clusterTrustBundle, {
          instancePath: instancePath + '/clusterTrustBundle',
          parentData: data,
          parentDataProperty: 'clusterTrustBundle',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate743.errors
            : vErrors.concat(validate743.errors);
        errors = vErrors.length;
      }
    }
    if (data.configMap !== undefined) {
      if (
        !validate269(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate269.errors
            : vErrors.concat(validate269.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate751(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate751.errors
            : vErrors.concat(validate751.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate269(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate269.errors
            : vErrors.concat(validate269.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccountToken !== undefined) {
      if (
        !validate755(data.serviceAccountToken, {
          instancePath: instancePath + '/serviceAccountToken',
          parentData: data,
          parentDataProperty: 'serviceAccountToken',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate755.errors
            : vErrors.concat(validate755.errors);
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
  validate742.errors = vErrors;
  return errors === 0;
}
function validate741(
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
        !validate742(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate742.errors
            : vErrors.concat(validate742.errors);
        errors = vErrors.length;
      }
    }
  }
  validate741.errors = vErrors;
  return errors === 0;
}
function validate739(
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
        !validate21(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.sources !== undefined) {
      if (
        !validate741(data.sources, {
          instancePath: instancePath + '/sources',
          parentData: data,
          parentDataProperty: 'sources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate741.errors
            : vErrors.concat(validate741.errors);
        errors = vErrors.length;
      }
    }
  }
  validate739.errors = vErrors;
  return errors === 0;
}
const schema198 = {
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
function validate763(
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
        !validate51(data.group, {
          instancePath: instancePath + '/group',
          parentData: data,
          parentDataProperty: 'group',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.registry !== undefined) {
      if (
        !validate22(data.registry, {
          instancePath: instancePath + '/registry',
          parentData: data,
          parentDataProperty: 'registry',
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
    if (data.tenant !== undefined) {
      if (
        !validate51(data.tenant, {
          instancePath: instancePath + '/tenant',
          parentData: data,
          parentDataProperty: 'tenant',
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
    if (data.user !== undefined) {
      if (
        !validate51(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
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
    if (data.volume !== undefined) {
      if (
        !validate22(data.volume, {
          instancePath: instancePath + '/volume',
          parentData: data,
          parentDataProperty: 'volume',
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
  validate763.errors = vErrors;
  return errors === 0;
}
const schema199 = {
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
const schema200 = {
  default: '/etc/ceph/keyring',
  type: 'string',
  nullable: true,
};
function validate774(
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
  validate774.errors = vErrors;
  return errors === 0;
}
const schema201 = {
  default: 'rbd',
  type: 'string',
  nullable: true,
};
function validate777(
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
  validate777.errors = vErrors;
  return errors === 0;
}
const schema202 = {
  default: 'admin',
  type: 'string',
  nullable: true,
};
function validate781(
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
  validate781.errors = vErrors;
  return errors === 0;
}
function validate771(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.keyring !== undefined) {
      if (
        !validate774(data.keyring, {
          instancePath: instancePath + '/keyring',
          parentData: data,
          parentDataProperty: 'keyring',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate774.errors
            : vErrors.concat(validate774.errors);
        errors = vErrors.length;
      }
    }
    if (data.monitors !== undefined) {
      if (
        !validate273(data.monitors, {
          instancePath: instancePath + '/monitors',
          parentData: data,
          parentDataProperty: 'monitors',
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
    if (data.pool !== undefined) {
      if (
        !validate777(data.pool, {
          instancePath: instancePath + '/pool',
          parentData: data,
          parentDataProperty: 'pool',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate777.errors
            : vErrors.concat(validate777.errors);
        errors = vErrors.length;
      }
    }
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.user !== undefined) {
      if (
        !validate781(data.user, {
          instancePath: instancePath + '/user',
          parentData: data,
          parentDataProperty: 'user',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate781.errors
            : vErrors.concat(validate781.errors);
        errors = vErrors.length;
      }
    }
  }
  validate771.errors = vErrors;
  return errors === 0;
}
const schema203 = {
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
const schema204 = {
  default: 'xfs',
  type: 'string',
  nullable: true,
};
function validate785(
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
  validate785.errors = vErrors;
  return errors === 0;
}
const schema205 = {
  default: 'ThinProvisioned',
  type: 'string',
  nullable: true,
};
function validate792(
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
  validate792.errors = vErrors;
  return errors === 0;
}
function validate784(
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
        !validate785(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate785.errors
            : vErrors.concat(validate785.errors);
        errors = vErrors.length;
      }
    }
    if (data.gateway !== undefined) {
      if (
        !validate22(data.gateway, {
          instancePath: instancePath + '/gateway',
          parentData: data,
          parentDataProperty: 'gateway',
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
    if (data.protectionDomain !== undefined) {
      if (
        !validate51(data.protectionDomain, {
          instancePath: instancePath + '/protectionDomain',
          parentData: data,
          parentDataProperty: 'protectionDomain',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate275(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.sslEnabled !== undefined) {
      if (
        !validate53(data.sslEnabled, {
          instancePath: instancePath + '/sslEnabled',
          parentData: data,
          parentDataProperty: 'sslEnabled',
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
    if (data.storageMode !== undefined) {
      if (
        !validate792(data.storageMode, {
          instancePath: instancePath + '/storageMode',
          parentData: data,
          parentDataProperty: 'storageMode',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate792.errors
            : vErrors.concat(validate792.errors);
        errors = vErrors.length;
      }
    }
    if (data.storagePool !== undefined) {
      if (
        !validate51(data.storagePool, {
          instancePath: instancePath + '/storagePool',
          parentData: data,
          parentDataProperty: 'storagePool',
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
    if (data.system !== undefined) {
      if (
        !validate22(data.system, {
          instancePath: instancePath + '/system',
          parentData: data,
          parentDataProperty: 'system',
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
        !validate51(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
  validate784.errors = vErrors;
  return errors === 0;
}
const schema206 = {
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
function validate798(
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
        !validate21(data.defaultMode, {
          instancePath: instancePath + '/defaultMode',
          parentData: data,
          parentDataProperty: 'defaultMode',
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
    if (data.items !== undefined) {
      if (
        !validate256(data.items, {
          instancePath: instancePath + '/items',
          parentData: data,
          parentDataProperty: 'items',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate256.errors
            : vErrors.concat(validate256.errors);
        errors = vErrors.length;
      }
    }
    if (data.optional !== undefined) {
      if (
        !validate53(data.optional, {
          instancePath: instancePath + '/optional',
          parentData: data,
          parentDataProperty: 'optional',
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
    if (data.secretName !== undefined) {
      if (
        !validate51(data.secretName, {
          instancePath: instancePath + '/secretName',
          parentData: data,
          parentDataProperty: 'secretName',
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
  validate798.errors = vErrors;
  return errors === 0;
}
const schema207 = {
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
function validate804(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.readOnly !== undefined) {
      if (
        !validate53(data.readOnly, {
          instancePath: instancePath + '/readOnly',
          parentData: data,
          parentDataProperty: 'readOnly',
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
    if (data.secretRef !== undefined) {
      if (
        !validate254(data.secretRef, {
          instancePath: instancePath + '/secretRef',
          parentData: data,
          parentDataProperty: 'secretRef',
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
    if (data.volumeName !== undefined) {
      if (
        !validate51(data.volumeName, {
          instancePath: instancePath + '/volumeName',
          parentData: data,
          parentDataProperty: 'volumeName',
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
    if (data.volumeNamespace !== undefined) {
      if (
        !validate51(data.volumeNamespace, {
          instancePath: instancePath + '/volumeNamespace',
          parentData: data,
          parentDataProperty: 'volumeNamespace',
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
  validate804.errors = vErrors;
  return errors === 0;
}
const schema208 = {
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
function validate811(
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
        !validate51(data.fsType, {
          instancePath: instancePath + '/fsType',
          parentData: data,
          parentDataProperty: 'fsType',
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
    if (data.storagePolicyID !== undefined) {
      if (
        !validate51(data.storagePolicyID, {
          instancePath: instancePath + '/storagePolicyID',
          parentData: data,
          parentDataProperty: 'storagePolicyID',
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
    if (data.storagePolicyName !== undefined) {
      if (
        !validate51(data.storagePolicyName, {
          instancePath: instancePath + '/storagePolicyName',
          parentData: data,
          parentDataProperty: 'storagePolicyName',
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
    if (data.volumePath !== undefined) {
      if (
        !validate22(data.volumePath, {
          instancePath: instancePath + '/volumePath',
          parentData: data,
          parentDataProperty: 'volumePath',
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
  validate811.errors = vErrors;
  return errors === 0;
}
function validate580(
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
        !validate581(data.awsElasticBlockStore, {
          instancePath: instancePath + '/awsElasticBlockStore',
          parentData: data,
          parentDataProperty: 'awsElasticBlockStore',
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
    if (data.azureDisk !== undefined) {
      if (
        !validate587(data.azureDisk, {
          instancePath: instancePath + '/azureDisk',
          parentData: data,
          parentDataProperty: 'azureDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate587.errors
            : vErrors.concat(validate587.errors);
        errors = vErrors.length;
      }
    }
    if (data.azureFile !== undefined) {
      if (
        !validate596(data.azureFile, {
          instancePath: instancePath + '/azureFile',
          parentData: data,
          parentDataProperty: 'azureFile',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate596.errors
            : vErrors.concat(validate596.errors);
        errors = vErrors.length;
      }
    }
    if (data.cephfs !== undefined) {
      if (
        !validate601(data.cephfs, {
          instancePath: instancePath + '/cephfs',
          parentData: data,
          parentDataProperty: 'cephfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate601.errors
            : vErrors.concat(validate601.errors);
        errors = vErrors.length;
      }
    }
    if (data.cinder !== undefined) {
      if (
        !validate609(data.cinder, {
          instancePath: instancePath + '/cinder',
          parentData: data,
          parentDataProperty: 'cinder',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate609.errors
            : vErrors.concat(validate609.errors);
        errors = vErrors.length;
      }
    }
    if (data.configMap !== undefined) {
      if (
        !validate615(data.configMap, {
          instancePath: instancePath + '/configMap',
          parentData: data,
          parentDataProperty: 'configMap',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate615.errors
            : vErrors.concat(validate615.errors);
        errors = vErrors.length;
      }
    }
    if (data.csi !== undefined) {
      if (
        !validate621(data.csi, {
          instancePath: instancePath + '/csi',
          parentData: data,
          parentDataProperty: 'csi',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate621.errors
            : vErrors.concat(validate621.errors);
        errors = vErrors.length;
      }
    }
    if (data.downwardAPI !== undefined) {
      if (
        !validate628(data.downwardAPI, {
          instancePath: instancePath + '/downwardAPI',
          parentData: data,
          parentDataProperty: 'downwardAPI',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate628.errors
            : vErrors.concat(validate628.errors);
        errors = vErrors.length;
      }
    }
    if (data.emptyDir !== undefined) {
      if (
        !validate632(data.emptyDir, {
          instancePath: instancePath + '/emptyDir',
          parentData: data,
          parentDataProperty: 'emptyDir',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate632.errors
            : vErrors.concat(validate632.errors);
        errors = vErrors.length;
      }
    }
    if (data.ephemeral !== undefined) {
      if (
        !validate636(data.ephemeral, {
          instancePath: instancePath + '/ephemeral',
          parentData: data,
          parentDataProperty: 'ephemeral',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate636.errors
            : vErrors.concat(validate636.errors);
        errors = vErrors.length;
      }
    }
    if (data.fc !== undefined) {
      if (
        !validate664(data.fc, {
          instancePath: instancePath + '/fc',
          parentData: data,
          parentDataProperty: 'fc',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate664.errors
            : vErrors.concat(validate664.errors);
        errors = vErrors.length;
      }
    }
    if (data.flexVolume !== undefined) {
      if (
        !validate671(data.flexVolume, {
          instancePath: instancePath + '/flexVolume',
          parentData: data,
          parentDataProperty: 'flexVolume',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate671.errors
            : vErrors.concat(validate671.errors);
        errors = vErrors.length;
      }
    }
    if (data.flocker !== undefined) {
      if (
        !validate678(data.flocker, {
          instancePath: instancePath + '/flocker',
          parentData: data,
          parentDataProperty: 'flocker',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate678.errors
            : vErrors.concat(validate678.errors);
        errors = vErrors.length;
      }
    }
    if (data.gcePersistentDisk !== undefined) {
      if (
        !validate682(data.gcePersistentDisk, {
          instancePath: instancePath + '/gcePersistentDisk',
          parentData: data,
          parentDataProperty: 'gcePersistentDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate682.errors
            : vErrors.concat(validate682.errors);
        errors = vErrors.length;
      }
    }
    if (data.gitRepo !== undefined) {
      if (
        !validate688(data.gitRepo, {
          instancePath: instancePath + '/gitRepo',
          parentData: data,
          parentDataProperty: 'gitRepo',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate688.errors
            : vErrors.concat(validate688.errors);
        errors = vErrors.length;
      }
    }
    if (data.glusterfs !== undefined) {
      if (
        !validate693(data.glusterfs, {
          instancePath: instancePath + '/glusterfs',
          parentData: data,
          parentDataProperty: 'glusterfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate693.errors
            : vErrors.concat(validate693.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostPath !== undefined) {
      if (
        !validate698(data.hostPath, {
          instancePath: instancePath + '/hostPath',
          parentData: data,
          parentDataProperty: 'hostPath',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate698.errors
            : vErrors.concat(validate698.errors);
        errors = vErrors.length;
      }
    }
    if (data.image !== undefined) {
      if (
        !validate702(data.image, {
          instancePath: instancePath + '/image',
          parentData: data,
          parentDataProperty: 'image',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate702.errors
            : vErrors.concat(validate702.errors);
        errors = vErrors.length;
      }
    }
    if (data.iscsi !== undefined) {
      if (
        !validate706(data.iscsi, {
          instancePath: instancePath + '/iscsi',
          parentData: data,
          parentDataProperty: 'iscsi',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate706.errors
            : vErrors.concat(validate706.errors);
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
    if (data.nfs !== undefined) {
      if (
        !validate721(data.nfs, {
          instancePath: instancePath + '/nfs',
          parentData: data,
          parentDataProperty: 'nfs',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate721.errors
            : vErrors.concat(validate721.errors);
        errors = vErrors.length;
      }
    }
    if (data.persistentVolumeClaim !== undefined) {
      if (
        !validate726(data.persistentVolumeClaim, {
          instancePath: instancePath + '/persistentVolumeClaim',
          parentData: data,
          parentDataProperty: 'persistentVolumeClaim',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate726.errors
            : vErrors.concat(validate726.errors);
        errors = vErrors.length;
      }
    }
    if (data.photonPersistentDisk !== undefined) {
      if (
        !validate730(data.photonPersistentDisk, {
          instancePath: instancePath + '/photonPersistentDisk',
          parentData: data,
          parentDataProperty: 'photonPersistentDisk',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate730.errors
            : vErrors.concat(validate730.errors);
        errors = vErrors.length;
      }
    }
    if (data.portworxVolume !== undefined) {
      if (
        !validate734(data.portworxVolume, {
          instancePath: instancePath + '/portworxVolume',
          parentData: data,
          parentDataProperty: 'portworxVolume',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate734.errors
            : vErrors.concat(validate734.errors);
        errors = vErrors.length;
      }
    }
    if (data.projected !== undefined) {
      if (
        !validate739(data.projected, {
          instancePath: instancePath + '/projected',
          parentData: data,
          parentDataProperty: 'projected',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate739.errors
            : vErrors.concat(validate739.errors);
        errors = vErrors.length;
      }
    }
    if (data.quobyte !== undefined) {
      if (
        !validate763(data.quobyte, {
          instancePath: instancePath + '/quobyte',
          parentData: data,
          parentDataProperty: 'quobyte',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate763.errors
            : vErrors.concat(validate763.errors);
        errors = vErrors.length;
      }
    }
    if (data.rbd !== undefined) {
      if (
        !validate771(data.rbd, {
          instancePath: instancePath + '/rbd',
          parentData: data,
          parentDataProperty: 'rbd',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate771.errors
            : vErrors.concat(validate771.errors);
        errors = vErrors.length;
      }
    }
    if (data.scaleIO !== undefined) {
      if (
        !validate784(data.scaleIO, {
          instancePath: instancePath + '/scaleIO',
          parentData: data,
          parentDataProperty: 'scaleIO',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate784.errors
            : vErrors.concat(validate784.errors);
        errors = vErrors.length;
      }
    }
    if (data.secret !== undefined) {
      if (
        !validate798(data.secret, {
          instancePath: instancePath + '/secret',
          parentData: data,
          parentDataProperty: 'secret',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate798.errors
            : vErrors.concat(validate798.errors);
        errors = vErrors.length;
      }
    }
    if (data.storageos !== undefined) {
      if (
        !validate804(data.storageos, {
          instancePath: instancePath + '/storageos',
          parentData: data,
          parentDataProperty: 'storageos',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate804.errors
            : vErrors.concat(validate804.errors);
        errors = vErrors.length;
      }
    }
    if (data.vsphereVolume !== undefined) {
      if (
        !validate811(data.vsphereVolume, {
          instancePath: instancePath + '/vsphereVolume',
          parentData: data,
          parentDataProperty: 'vsphereVolume',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate811.errors
            : vErrors.concat(validate811.errors);
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
  validate580.errors = vErrors;
  return errors === 0;
}
function validate579(
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
        !validate580(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate579.errors = vErrors;
  return errors === 0;
}
function validate424(
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
    if (data.containers === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'containers',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.activeDeadlineSeconds !== undefined) {
      if (
        !validate61(data.activeDeadlineSeconds, {
          instancePath: instancePath + '/activeDeadlineSeconds',
          parentData: data,
          parentDataProperty: 'activeDeadlineSeconds',
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
    if (data.affinity !== undefined) {
      if (
        !validate426(data.affinity, {
          instancePath: instancePath + '/affinity',
          parentData: data,
          parentDataProperty: 'affinity',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate426.errors
            : vErrors.concat(validate426.errors);
        errors = vErrors.length;
      }
    }
    if (data.automountServiceAccountToken !== undefined) {
      if (
        !validate53(data.automountServiceAccountToken, {
          instancePath: instancePath + '/automountServiceAccountToken',
          parentData: data,
          parentDataProperty: 'automountServiceAccountToken',
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
    if (data.containers !== undefined) {
      if (
        !validate444(data.containers, {
          instancePath: instancePath + '/containers',
          parentData: data,
          parentDataProperty: 'containers',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate444.errors
            : vErrors.concat(validate444.errors);
        errors = vErrors.length;
      }
    }
    if (data.dnsConfig !== undefined) {
      if (
        !validate447(data.dnsConfig, {
          instancePath: instancePath + '/dnsConfig',
          parentData: data,
          parentDataProperty: 'dnsConfig',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate447.errors
            : vErrors.concat(validate447.errors);
        errors = vErrors.length;
      }
    }
    if (data.dnsPolicy !== undefined) {
      if (
        !validate51(data.dnsPolicy, {
          instancePath: instancePath + '/dnsPolicy',
          parentData: data,
          parentDataProperty: 'dnsPolicy',
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
    if (data.enableServiceLinks !== undefined) {
      if (
        !validate53(data.enableServiceLinks, {
          instancePath: instancePath + '/enableServiceLinks',
          parentData: data,
          parentDataProperty: 'enableServiceLinks',
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
    if (data.ephemeralContainers !== undefined) {
      if (
        !validate459(data.ephemeralContainers, {
          instancePath: instancePath + '/ephemeralContainers',
          parentData: data,
          parentDataProperty: 'ephemeralContainers',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate459.errors
            : vErrors.concat(validate459.errors);
        errors = vErrors.length;
      }
    }
    if (data.hostAliases !== undefined) {
      if (
        !validate488(data.hostAliases, {
          instancePath: instancePath + '/hostAliases',
          parentData: data,
          parentDataProperty: 'hostAliases',
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
    if (data.hostIPC !== undefined) {
      if (
        !validate53(data.hostIPC, {
          instancePath: instancePath + '/hostIPC',
          parentData: data,
          parentDataProperty: 'hostIPC',
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
    if (data.hostNetwork !== undefined) {
      if (
        !validate53(data.hostNetwork, {
          instancePath: instancePath + '/hostNetwork',
          parentData: data,
          parentDataProperty: 'hostNetwork',
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
    if (data.hostPID !== undefined) {
      if (
        !validate53(data.hostPID, {
          instancePath: instancePath + '/hostPID',
          parentData: data,
          parentDataProperty: 'hostPID',
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
    if (data.hostUsers !== undefined) {
      if (
        !validate53(data.hostUsers, {
          instancePath: instancePath + '/hostUsers',
          parentData: data,
          parentDataProperty: 'hostUsers',
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
    if (data.hostname !== undefined) {
      if (
        !validate51(data.hostname, {
          instancePath: instancePath + '/hostname',
          parentData: data,
          parentDataProperty: 'hostname',
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
    if (data.imagePullSecrets !== undefined) {
      if (
        !validate499(data.imagePullSecrets, {
          instancePath: instancePath + '/imagePullSecrets',
          parentData: data,
          parentDataProperty: 'imagePullSecrets',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate499.errors
            : vErrors.concat(validate499.errors);
        errors = vErrors.length;
      }
    }
    if (data.initContainers !== undefined) {
      if (
        !validate502(data.initContainers, {
          instancePath: instancePath + '/initContainers',
          parentData: data,
          parentDataProperty: 'initContainers',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate502.errors
            : vErrors.concat(validate502.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodeName !== undefined) {
      if (
        !validate51(data.nodeName, {
          instancePath: instancePath + '/nodeName',
          parentData: data,
          parentDataProperty: 'nodeName',
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
    if (data.nodeSelector !== undefined) {
      if (
        !validate44(data.nodeSelector, {
          instancePath: instancePath + '/nodeSelector',
          parentData: data,
          parentDataProperty: 'nodeSelector',
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
    if (data.os !== undefined) {
      if (
        !validate507(data.os, {
          instancePath: instancePath + '/os',
          parentData: data,
          parentDataProperty: 'os',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate507.errors
            : vErrors.concat(validate507.errors);
        errors = vErrors.length;
      }
    }
    if (data.overhead !== undefined) {
      if (
        !validate132(data.overhead, {
          instancePath: instancePath + '/overhead',
          parentData: data,
          parentDataProperty: 'overhead',
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
    if (data.preemptionPolicy !== undefined) {
      if (
        !validate51(data.preemptionPolicy, {
          instancePath: instancePath + '/preemptionPolicy',
          parentData: data,
          parentDataProperty: 'preemptionPolicy',
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
    if (data.priority !== undefined) {
      if (
        !validate21(data.priority, {
          instancePath: instancePath + '/priority',
          parentData: data,
          parentDataProperty: 'priority',
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
    if (data.priorityClassName !== undefined) {
      if (
        !validate51(data.priorityClassName, {
          instancePath: instancePath + '/priorityClassName',
          parentData: data,
          parentDataProperty: 'priorityClassName',
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
    if (data.readinessGates !== undefined) {
      if (
        !validate514(data.readinessGates, {
          instancePath: instancePath + '/readinessGates',
          parentData: data,
          parentDataProperty: 'readinessGates',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate514.errors
            : vErrors.concat(validate514.errors);
        errors = vErrors.length;
      }
    }
    if (data.resourceClaims !== undefined) {
      if (
        !validate519(data.resourceClaims, {
          instancePath: instancePath + '/resourceClaims',
          parentData: data,
          parentDataProperty: 'resourceClaims',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate519.errors
            : vErrors.concat(validate519.errors);
        errors = vErrors.length;
      }
    }
    if (data.resources !== undefined) {
      if (
        !validate178(data.resources, {
          instancePath: instancePath + '/resources',
          parentData: data,
          parentDataProperty: 'resources',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate178.errors
            : vErrors.concat(validate178.errors);
        errors = vErrors.length;
      }
    }
    if (data.restartPolicy !== undefined) {
      if (
        !validate51(data.restartPolicy, {
          instancePath: instancePath + '/restartPolicy',
          parentData: data,
          parentDataProperty: 'restartPolicy',
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
    if (data.runtimeClassName !== undefined) {
      if (
        !validate51(data.runtimeClassName, {
          instancePath: instancePath + '/runtimeClassName',
          parentData: data,
          parentDataProperty: 'runtimeClassName',
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
    if (data.schedulerName !== undefined) {
      if (
        !validate51(data.schedulerName, {
          instancePath: instancePath + '/schedulerName',
          parentData: data,
          parentDataProperty: 'schedulerName',
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
    if (data.schedulingGates !== undefined) {
      if (
        !validate530(data.schedulingGates, {
          instancePath: instancePath + '/schedulingGates',
          parentData: data,
          parentDataProperty: 'schedulingGates',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate530.errors
            : vErrors.concat(validate530.errors);
        errors = vErrors.length;
      }
    }
    if (data.securityContext !== undefined) {
      if (
        !validate535(data.securityContext, {
          instancePath: instancePath + '/securityContext',
          parentData: data,
          parentDataProperty: 'securityContext',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate535.errors
            : vErrors.concat(validate535.errors);
        errors = vErrors.length;
      }
    }
    if (data.serviceAccount !== undefined) {
      if (
        !validate51(data.serviceAccount, {
          instancePath: instancePath + '/serviceAccount',
          parentData: data,
          parentDataProperty: 'serviceAccount',
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
    if (data.serviceAccountName !== undefined) {
      if (
        !validate51(data.serviceAccountName, {
          instancePath: instancePath + '/serviceAccountName',
          parentData: data,
          parentDataProperty: 'serviceAccountName',
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
    if (data.setHostnameAsFQDN !== undefined) {
      if (
        !validate53(data.setHostnameAsFQDN, {
          instancePath: instancePath + '/setHostnameAsFQDN',
          parentData: data,
          parentDataProperty: 'setHostnameAsFQDN',
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
    if (data.shareProcessNamespace !== undefined) {
      if (
        !validate53(data.shareProcessNamespace, {
          instancePath: instancePath + '/shareProcessNamespace',
          parentData: data,
          parentDataProperty: 'shareProcessNamespace',
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
    if (data.subdomain !== undefined) {
      if (
        !validate51(data.subdomain, {
          instancePath: instancePath + '/subdomain',
          parentData: data,
          parentDataProperty: 'subdomain',
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
    if (data.terminationGracePeriodSeconds !== undefined) {
      if (
        !validate61(data.terminationGracePeriodSeconds, {
          instancePath: instancePath + '/terminationGracePeriodSeconds',
          parentData: data,
          parentDataProperty: 'terminationGracePeriodSeconds',
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
    if (data.tolerations !== undefined) {
      if (
        !validate558(data.tolerations, {
          instancePath: instancePath + '/tolerations',
          parentData: data,
          parentDataProperty: 'tolerations',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate558.errors
            : vErrors.concat(validate558.errors);
        errors = vErrors.length;
      }
    }
    if (data.topologySpreadConstraints !== undefined) {
      if (
        !validate567(data.topologySpreadConstraints, {
          instancePath: instancePath + '/topologySpreadConstraints',
          parentData: data,
          parentDataProperty: 'topologySpreadConstraints',
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
    if (data.volumes !== undefined) {
      if (
        !validate579(data.volumes, {
          instancePath: instancePath + '/volumes',
          parentData: data,
          parentDataProperty: 'volumes',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate579.errors
            : vErrors.concat(validate579.errors);
        errors = vErrors.length;
      }
    }
  }
  validate424.errors = vErrors;
  return errors === 0;
}
function validate422(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.metadata !== undefined) {
      if (
        !validate55(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate424(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate424.errors
            : vErrors.concat(validate424.errors);
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
  validate422.errors = vErrors;
  return errors === 0;
}
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
    if (data.template === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'template',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.activeDeadlineSeconds !== undefined) {
      if (
        !validate61(data.activeDeadlineSeconds, {
          instancePath: instancePath + '/activeDeadlineSeconds',
          parentData: data,
          parentDataProperty: 'activeDeadlineSeconds',
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
    if (data.backoffLimit !== undefined) {
      if (
        !validate21(data.backoffLimit, {
          instancePath: instancePath + '/backoffLimit',
          parentData: data,
          parentDataProperty: 'backoffLimit',
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
    if (data.backoffLimitPerIndex !== undefined) {
      if (
        !validate21(data.backoffLimitPerIndex, {
          instancePath: instancePath + '/backoffLimitPerIndex',
          parentData: data,
          parentDataProperty: 'backoffLimitPerIndex',
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
    if (data.completionMode !== undefined) {
      if (
        !validate51(data.completionMode, {
          instancePath: instancePath + '/completionMode',
          parentData: data,
          parentDataProperty: 'completionMode',
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
    if (data.completions !== undefined) {
      if (
        !validate21(data.completions, {
          instancePath: instancePath + '/completions',
          parentData: data,
          parentDataProperty: 'completions',
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
    if (data.managedBy !== undefined) {
      if (
        !validate51(data.managedBy, {
          instancePath: instancePath + '/managedBy',
          parentData: data,
          parentDataProperty: 'managedBy',
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
    if (data.manualSelector !== undefined) {
      if (
        !validate53(data.manualSelector, {
          instancePath: instancePath + '/manualSelector',
          parentData: data,
          parentDataProperty: 'manualSelector',
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
    if (data.maxFailedIndexes !== undefined) {
      if (
        !validate21(data.maxFailedIndexes, {
          instancePath: instancePath + '/maxFailedIndexes',
          parentData: data,
          parentDataProperty: 'maxFailedIndexes',
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
    if (data.parallelism !== undefined) {
      if (
        !validate21(data.parallelism, {
          instancePath: instancePath + '/parallelism',
          parentData: data,
          parentDataProperty: 'parallelism',
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
    if (data.podFailurePolicy !== undefined) {
      if (
        !validate391(data.podFailurePolicy, {
          instancePath: instancePath + '/podFailurePolicy',
          parentData: data,
          parentDataProperty: 'podFailurePolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate391.errors
            : vErrors.concat(validate391.errors);
        errors = vErrors.length;
      }
    }
    if (data.podReplacementPolicy !== undefined) {
      if (
        !validate51(data.podReplacementPolicy, {
          instancePath: instancePath + '/podReplacementPolicy',
          parentData: data,
          parentDataProperty: 'podReplacementPolicy',
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
    if (data.selector !== undefined) {
      if (
        !validate34(data.selector, {
          instancePath: instancePath + '/selector',
          parentData: data,
          parentDataProperty: 'selector',
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
    if (data.successPolicy !== undefined) {
      if (
        !validate413(data.successPolicy, {
          instancePath: instancePath + '/successPolicy',
          parentData: data,
          parentDataProperty: 'successPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate413.errors
            : vErrors.concat(validate413.errors);
        errors = vErrors.length;
      }
    }
    if (data.suspend !== undefined) {
      if (
        !validate53(data.suspend, {
          instancePath: instancePath + '/suspend',
          parentData: data,
          parentDataProperty: 'suspend',
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
    if (data.template !== undefined) {
      if (
        !validate422(data.template, {
          instancePath: instancePath + '/template',
          parentData: data,
          parentDataProperty: 'template',
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
    if (data.ttlSecondsAfterFinished !== undefined) {
      if (
        !validate21(data.ttlSecondsAfterFinished, {
          instancePath: instancePath + '/ttlSecondsAfterFinished',
          parentData: data,
          parentDataProperty: 'ttlSecondsAfterFinished',
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
  validate381.errors = vErrors;
  return errors === 0;
}
function validate379(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.metadata !== undefined) {
      if (
        !validate55(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate381(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
  validate379.errors = vErrors;
  return errors === 0;
}
function validate369(
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
    if (data.template === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'template',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.dependsOn !== undefined) {
      if (
        !validate370(data.dependsOn, {
          instancePath: instancePath + '/dependsOn',
          parentData: data,
          parentDataProperty: 'dependsOn',
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
    if (data.replicas !== undefined) {
      if (
        !validate54(data.replicas, {
          instancePath: instancePath + '/replicas',
          parentData: data,
          parentDataProperty: 'replicas',
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
    if (data.template !== undefined) {
      if (
        !validate379(data.template, {
          instancePath: instancePath + '/template',
          parentData: data,
          parentDataProperty: 'template',
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
  validate369.errors = vErrors;
  return errors === 0;
}
function validate368(
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
        !validate369(data[i0], {
          instancePath: instancePath + '/' + i0,
          parentData: data,
          parentDataProperty: i0,
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
  }
  validate368.errors = vErrors;
  return errors === 0;
}
const schema209 = {
  properties: {
    startupPolicyOrder: {
      $ref: 'FX1kBXTbIeiCfARogNoFlMzEaZSp0Xa4KbnF6OLERAc',
    },
  },
  required: ['startupPolicyOrder'],
  type: 'object',
  nullable: true,
};
const schema210 = {
  enum: ['AnyOrder', 'InOrder'],
  type: 'string',
};
function validate827(
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
  if (!(data === 'AnyOrder' || data === 'InOrder')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema210.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate827.errors = vErrors;
  return errors === 0;
}
function validate826(
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
    if (data.startupPolicyOrder === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'startupPolicyOrder',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.startupPolicyOrder !== undefined) {
      if (
        !validate827(data.startupPolicyOrder, {
          instancePath: instancePath + '/startupPolicyOrder',
          parentData: data,
          parentDataProperty: 'startupPolicyOrder',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate827.errors
            : vErrors.concat(validate827.errors);
        errors = vErrors.length;
      }
    }
  }
  validate826.errors = vErrors;
  return errors === 0;
}
const schema211 = {
  properties: {
    operator: {
      $ref: 'Sr7H7RdrDYaV8HeyHt8T9UbaUTWNiMpuqAqthARC8g',
    },
    targetReplicatedJobs: {
      $ref: 'aRQtgAls8PT3219P8mxz6PPEAVWN1SvmCHi6z12UM',
    },
  },
  required: ['operator'],
  type: 'object',
  nullable: true,
};
const schema212 = {
  enum: ['All', 'Any'],
  type: 'string',
};
function validate831(
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
  if (!(data === 'All' || data === 'Any')) {
    const err1 = {
      instancePath,
      schemaPath: '#/enum',
      keyword: 'enum',
      params: {
        allowedValues: schema212.enum,
      },
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate831.errors = vErrors;
  return errors === 0;
}
function validate830(
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
    if (data.operator !== undefined) {
      if (
        !validate831(data.operator, {
          instancePath: instancePath + '/operator',
          parentData: data,
          parentDataProperty: 'operator',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate831.errors
            : vErrors.concat(validate831.errors);
        errors = vErrors.length;
      }
    }
    if (data.targetReplicatedJobs !== undefined) {
      if (
        !validate39(data.targetReplicatedJobs, {
          instancePath: instancePath + '/targetReplicatedJobs',
          parentData: data,
          parentDataProperty: 'targetReplicatedJobs',
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
  validate830.errors = vErrors;
  return errors === 0;
}
const schema213 = {
  format: 'int32',
  type: 'integer',
  minimum: 0,
  nullable: true,
};
function validate836(
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
    if (!formats0.validate(data)) {
      const err2 = {
        instancePath,
        schemaPath: '#/format',
        keyword: 'format',
        params: {
          format: 'int32',
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
  validate836.errors = vErrors;
  return errors === 0;
}
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
    if (data.coordinator !== undefined) {
      if (
        !validate343(data.coordinator, {
          instancePath: instancePath + '/coordinator',
          parentData: data,
          parentDataProperty: 'coordinator',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate343.errors
            : vErrors.concat(validate343.errors);
        errors = vErrors.length;
      }
    }
    if (data.failurePolicy !== undefined) {
      if (
        !validate348(data.failurePolicy, {
          instancePath: instancePath + '/failurePolicy',
          parentData: data,
          parentDataProperty: 'failurePolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate348.errors
            : vErrors.concat(validate348.errors);
        errors = vErrors.length;
      }
    }
    if (data.managedBy !== undefined) {
      if (
        !validate51(data.managedBy, {
          instancePath: instancePath + '/managedBy',
          parentData: data,
          parentDataProperty: 'managedBy',
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
    if (data.network !== undefined) {
      if (
        !validate363(data.network, {
          instancePath: instancePath + '/network',
          parentData: data,
          parentDataProperty: 'network',
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
    if (data.replicatedJobs !== undefined) {
      if (
        !validate368(data.replicatedJobs, {
          instancePath: instancePath + '/replicatedJobs',
          parentData: data,
          parentDataProperty: 'replicatedJobs',
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
    if (data.startupPolicy !== undefined) {
      if (
        !validate826(data.startupPolicy, {
          instancePath: instancePath + '/startupPolicy',
          parentData: data,
          parentDataProperty: 'startupPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate826.errors
            : vErrors.concat(validate826.errors);
        errors = vErrors.length;
      }
    }
    if (data.successPolicy !== undefined) {
      if (
        !validate830(data.successPolicy, {
          instancePath: instancePath + '/successPolicy',
          parentData: data,
          parentDataProperty: 'successPolicy',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate830.errors
            : vErrors.concat(validate830.errors);
        errors = vErrors.length;
      }
    }
    if (data.suspend !== undefined) {
      if (
        !validate53(data.suspend, {
          instancePath: instancePath + '/suspend',
          parentData: data,
          parentDataProperty: 'suspend',
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
    if (data.ttlSecondsAfterFinished !== undefined) {
      if (
        !validate836(data.ttlSecondsAfterFinished, {
          instancePath: instancePath + '/ttlSecondsAfterFinished',
          parentData: data,
          parentDataProperty: 'ttlSecondsAfterFinished',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate836.errors
            : vErrors.concat(validate836.errors);
        errors = vErrors.length;
      }
    }
  }
  validate342.errors = vErrors;
  return errors === 0;
}
function validate340(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.metadata !== undefined) {
      if (
        !validate55(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate342(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
  validate340.errors = vErrors;
  return errors === 0;
}
function validate286(
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
    if (data.template === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: {
          missingProperty: 'template',
        },
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.mlPolicy !== undefined) {
      if (
        !validate287(data.mlPolicy, {
          instancePath: instancePath + '/mlPolicy',
          parentData: data,
          parentDataProperty: 'mlPolicy',
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
    if (data.podGroupPolicy !== undefined) {
      if (
        !validate334(data.podGroupPolicy, {
          instancePath: instancePath + '/podGroupPolicy',
          parentData: data,
          parentDataProperty: 'podGroupPolicy',
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
    if (data.template !== undefined) {
      if (
        !validate340(data.template, {
          instancePath: instancePath + '/template',
          parentData: data,
          parentDataProperty: 'template',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate340.errors
            : vErrors.concat(validate340.errors);
        errors = vErrors.length;
      }
    }
  }
  validate286.errors = vErrors;
  return errors === 0;
}
function validate277(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
  /*# sourceURL="trainer.kubeflow.org.v1alpha1.TrainingRuntime" */
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
        !validate278(data.apiVersion, {
          instancePath: instancePath + '/apiVersion',
          parentData: data,
          parentDataProperty: 'apiVersion',
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
    if (data.kind !== undefined) {
      if (
        !validate280(data.kind, {
          instancePath: instancePath + '/kind',
          parentData: data,
          parentDataProperty: 'kind',
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate280.errors
            : vErrors.concat(validate280.errors);
        errors = vErrors.length;
      }
    }
    if (data.metadata !== undefined) {
      if (
        !validate282(data.metadata, {
          instancePath: instancePath + '/metadata',
          parentData: data,
          parentDataProperty: 'metadata',
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
    if (data.spec !== undefined) {
      if (
        !validate286(data.spec, {
          instancePath: instancePath + '/spec',
          parentData: data,
          parentDataProperty: 'spec',
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
  validate277.errors = vErrors;
  return errors === 0;
}
