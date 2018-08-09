import EditorForm from './editform/index'
import Preview from './preview/index'

let definition = {
    // 所属bundle
    bundleId: {
        groupId: '',
        artifactId: '',
        version: '',
        classifier: '',
    },
    name: '',
    description: '',
    preview: Preview, // 预览组件
    previewType: 'react',
    editForm: EditorForm, // 数据编辑表单
    editFormType: 'react',
    editable: false, // 组件数据是否可编辑
    canDelete: false, // 组件数据是否可编辑
    dragable: true, // 是否可以拖拽
    highlightWhenSelect: true, // 选择后是否高亮
    // 获取初始值
    getInitialValue() {

    },
    // 验证示例数据
    validate(instance) {

    }
}
