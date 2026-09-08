package k8scluster

import (
	"testing"
	"time"

	"helm.sh/helm/v3/pkg/action"
)

func TestStoreChartInstallerAllowsReusingDeletedReleaseName(t *testing.T) {
	installer := newStoreChartInstaller(&action.Configuration{}, "demo", "default")
	if !installer.Replace {
		t.Fatal("Replace is false, deleted Helm release names cannot be reused")
	}
	if installer.Timeout != 5*time.Minute {
		t.Fatalf("installer timeout = %s, want 5m", installer.Timeout)
	}
}

func TestStoreChartInstallerDoesNotWaitForResourceReadiness(t *testing.T) {
	installer := newStoreChartInstaller(&action.Configuration{}, "demo", "default")
	if installer.Atomic || installer.Wait || installer.WaitForJobs {
		t.Fatalf(
			"installer waits for readiness: atomic=%v wait=%v waitForJobs=%v",
			installer.Atomic,
			installer.Wait,
			installer.WaitForJobs,
		)
	}
}

func TestHelmUninstallerRemovesReleaseHistory(t *testing.T) {
	uninstaller := newHelmUninstaller(&action.Configuration{})
	if uninstaller.KeepHistory {
		t.Fatal("KeepHistory is true, deleted Helm release name remains reserved")
	}
}
