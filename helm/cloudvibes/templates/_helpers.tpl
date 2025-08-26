{{/*
Expand the name of the chart.
*/}}
{{- define "cloudvibes.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "cloudvibes.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "cloudvibes.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "cloudvibes.labels" -}}
helm.sh/chart: {{ include "cloudvibes.chart" . }}
{{ include "cloudvibes.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "cloudvibes.selectorLabels" -}}
app.kubernetes.io/name: {{ include "cloudvibes.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Blue-Green slot labels
*/}}
{{- define "cloudvibes.slotLabels" -}}
{{ include "cloudvibes.selectorLabels" . }}
app.kubernetes.io/slot: {{ .slot }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "cloudvibes.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "cloudvibes.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Get the current active slot
*/}}
{{- define "cloudvibes.activeSlot" -}}
{{- .Values.blueGreen.activeSlot | default "blue" }}
{{- end }}

{{/*
Get the inactive slot
*/}}
{{- define "cloudvibes.inactiveSlot" -}}
{{- if eq (.Values.blueGreen.activeSlot | default "blue") "blue" }}
{{- print "green" }}
{{- else }}
{{- print "blue" }}
{{- end }}
{{- end }}

{{/*
Generate environment variables
*/}}
{{- define "cloudvibes.env" -}}
{{- range $key, $value := .Values.env }}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- end }}
{{- end }}