/*
Copyright 2022 The itcloudy.com Authors.

Licensed under the Apache LicenseCode, Version 2.0 (the "LicenseCode");
you may not use this file except in compliance with the LicenseCode.
You may obtain a copy of the LicenseCode at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the LicenseCode is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the LicenseCode for the specific language governing permissions and
limitations under the LicenseCode.
*/

package config

import (
	"bytes"
	"gopkg.in/yaml.v3"
	"os"
	"testing"
)

func TestConfig(t *testing.T) {
	config := &Config{

		LogConfig: &LogConfig{
			Level:      "debug",
			Filename:   "",
			MaxSize:    0,
			MaxAge:     0,
			MaxBackups: 0,
			LocalTime:  false,
			Compress:   false,
			Production: true,
		},
		OidcConfig: OidcConfig{
			Issuer:       "https://eauth.efucloud.com",
			ClientId:     "umtsnwb4nvehzfmwaimi5knql",
			ClientSecret: "boowj4iujtvqinyw5grtmqzvpblcc6v7jhpxke5zhiktxn6zw3u",
		},
		Mysql: &MysqlConfig{
			Host:                      "localhost:3306",
			User:                      "root",
			Password:                  "EfuCloud",
			Dbname:                    "kube_keeper",
			Charset:                   "utf8mb4",
			Loc:                       "",
			DefaultStringSize:         0,
			DisableDatetimePrecision:  false,
			DontSupportRenameIndex:    false,
			DontSupportRenameColumn:   false,
			SkipInitializeWithVersion: false,
		},
		AdminEmails: []string{"admin@efucloud.cn", "admin@efucloud.com"},
		ChatConfig: ChatConfig{
			UseTool: true,
			//Address: "https://api.siliconflow.cn/v1",
			//ApiKey:  "sk-dhjqactsmnojhemzrdrdvtutvauhgqrqqmthumpuranpefju",
			//Model:   "Qwen/Qwen3-Coder-480B-A35B-Instruct",
			Address: "https://dashscope.aliyuncs.com/compatible-mode/v1",
			ApiKey:  "sk-23486e1c9ed44d4c84f5cbb4babeaa41",
			Model:   "qwen3-coder-480b-a35b-instruct",
		},
		TerminalContainer: "registry.cn-shenzhen.aliyuncs.com/efucloud-public/k8s-tools:v1.0.0.03132013",
	}
	var buf bytes.Buffer
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(config); err != nil {
		t.Fatalf("encode yaml: %v", err)
	}
	if err := enc.Close(); err != nil {
		t.Fatalf("close encoder: %v", err)
	}
	if err := os.WriteFile("../../config/config.yaml", buf.Bytes(), os.ModePerm); err != nil {
		t.Fatalf("write yaml: %v", err)
	}
}
