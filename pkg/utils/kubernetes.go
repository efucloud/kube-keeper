package utils

import (
	"fmt"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/util/yaml"
)

func YamlToUnstructured(yamlData string) (*unstructured.Unstructured, error) {
	// 将 YAML 转为 JSON
	jsonData, err := yaml.ToJSON([]byte(yamlData))
	if err != nil {
		return nil, fmt.Errorf("failed to convert YAML to JSON: %w", err)
	}

	obj := &unstructured.Unstructured{}
	err = obj.UnmarshalJSON(jsonData)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON into Unstructured: %w", err)
	}
	return obj, nil
}

// CleanUnstructuredForAI 就地清理 unstructured 对象中对 AI 无用的字段
func CleanUnstructuredForAI(obj *unstructured.Unstructured) {
	if obj == nil {
		return
	}

	// 获取 metadata
	meta := obj.Object["metadata"]
	if metaMap, ok := meta.(map[string]interface{}); ok {
		// 删除 managedFields
		delete(metaMap, "managedFields")

		// 删除 annotations 中的 last-applied-configuration
		if annotations, ok := metaMap["annotations"].(map[string]interface{}); ok {
			delete(annotations, "kubectl.kubernetes.io/last-applied-configuration")
			// 如果 annotations 为空了，也可以选择删除整个 annotations 字段（可选）
			// if len(annotations) == 0 {
			//     delete(metaMap, "annotations")
			// }
		}
	}
}
