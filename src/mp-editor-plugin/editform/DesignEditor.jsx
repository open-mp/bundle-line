import React, {PureComponent, Component} from 'react';
import cx from 'classnames';

const NOT_EVENT_MSG =
    'onInputChange expects an `Event` with { target: { name, value } } as argument';


export class DesignEditor extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 通用的 Input 元素 onChange 回调函数
     *
     * 适用于 Input, Checkbox, Select, Radio
     */
    onInputChange = evt => {
        // 如果抛出来的不是 Event 对象，直接丢给 onChange
        if (!isEventLikeObject(evt)) {
            throw new Error(NOT_EVENT_MSG);
        }

        const {onChange} = this.props;
        const {target} = evt;
        const {name, type} = target;
        let {value} = target;

        if (type === 'checkbox') {
            value = target.checked;
        }

        onChange({
            [name]: value,
        });

    };

    /**
     * 有些组件的 onChange 事件抛出来的不是 Event 对象
     *
     * 适用于 Slider, Switch, DatePicker 以及其它自定义组件
     */
    onCustomInputChange = name => value => {
        const {onChange} = this.props;
        onChange({[name]: value});
    };

    /**
     * 处理 Input 元素的 blur 事件。
     */
    onInputBlur = evt => {
        // 如果抛出来的不是 Event 对象，直接丢给 onChange
        if (!isEventLikeObject(evt)) {
            throw new Error(NOT_EVENT_MSG);
        }

        const {
            target: {name},
        } = evt;
        this.onCustomInputBlur(name);
    };

    /**
     * 有些组件没有 onBlur 事件，用这个函数处理
     */
    onCustomInputBlur = name => {
    };
}

/**
 * 行布局
 */
export class ControlGroup extends PureComponent {

    static defaultProps = {
        required: false,
        showError: false,
        showLabel: true,
        focusOnLabelClick: true,
        error: ''
    };

    render() {
        const {
            className,
            showError,
            error,
            label,
            helpDesc,
            required,
            children,
            focusOnLabelClick,
        } = this.props;

        const errorVisible = showError && error;

        return (
            <div
                className={cx(`mp-design-editor__control-group`, className, {
                    'has-error': errorVisible,
                })}
            >
                {React.createElement(
                    focusOnLabelClick ? 'label' : 'div',
                    {
                        className: 'mp-design-editor__control-group-container',
                    },
                    <div
                        className='mp-design-editor__control-group-label'>
                        {required && (<span className='mp-design-editor__control-group-required-star'> * </span>)}
                        {label}
                    </div>,
                    <div className='mp-design-editor__control-group-control'>
                        {children}
                        {helpDesc && (
                            <div
                                className='mp-design-editor__control-group-help-desc'
                            >
                                {helpDesc}
                            </div>
                        )}
                    </div>
                )}
                {errorVisible && (
                    <div className='mp-design-editor__control-group-error'>
                        {error}
                    </div>
                )}
            </div>
        );
    }
}

function isEventLikeObject(evt) {
    return (
        evt &&
        evt.target &&
        evt.target.name &&
        evt.preventDefault &&
        evt.stopPropagation
    );
}
