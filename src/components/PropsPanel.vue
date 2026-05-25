<template>

  <div class="panel">

    <template v-if="current">

      <h2 class="title">

        组件属性

      </h2>

      <a-divider />

      <div class="form-item">

        <span>Padding</span>

        <a-input
          v-model:value="
            current.style.padding
          "
        />

      </div>

      <div class="form-item">

        <span>Margin</span>

        <a-input
          v-model:value="
            current.style.margin
          "
        />

      </div>

      <div class="form-item">

        <span>Border</span>

        <a-input
          v-model:value="
            current.style.border
          "
        />

      </div>

      <div class="form-item">

        <span>Background</span>

        <a-input
          v-model:value="
            current.style.backgroundColor
          "
        />

      </div>

    </template>

    <template v-else>

      <div class="empty-panel">

        <h2>

          页面属性

        </h2>

        <p>

          当前未选中组件

        </p>

      </div>

    </template>

  </div>

</template>

<script setup lang="ts">

import { computed } from 'vue'

import {
  useEditorStore
} from '../store/editor'

const editorStore =
  useEditorStore()

const current = computed(
  () =>
    editorStore.currentComponent
)

</script>

<style scoped>

.panel {

  height: 100%;

  padding: 20px;

  background: #1f1f1f;

  color: white;

}

.title {

  color: white;

}

.form-item {

  margin-bottom: 16px;

  display: flex;

  flex-direction: column;

  gap: 8px;

}

.form-item span {

  color: #d9d9d9;

}

.empty-panel {

  color: #cccccc;

  padding-top: 40px;

}

</style>