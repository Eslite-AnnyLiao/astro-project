import plugin from 'tailwindcss/plugin';

/**
 * Bootstrap Components 插件
 * 
 * 轉換 bootstrap-base/ 中的自定義 Bootstrap 元件為 Tailwind 元件
 * 保持 .ec- 前綴以維持現有程式碼相容性
 * 
 * 包含元件：
 * - Card (.ec-card, .ec-card-body)
 * - Form Controls (.ec-form-control)  
 * - Modal (.ec-modal, .ec-modal-dialog, .ec-modal-content)
 * - List Group (.ec-list-group, .ec-list-group-item)
 * - Form components (labels, form-text, form-check, input-group)
 */

export const bootstrapComponentsPlugin = plugin(({ addComponents, theme }) => {
  const components = {
    // ==========================================
    // Card Components (_card.scss)
    // ==========================================
    '.ec-card': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      color: theme('colors.gray-800') || '#212529',
      wordWrap: 'break-word',
      padding: '0rem 2.5rem',
      backgroundColor: theme('colors.white') || '#FFF',
      backgroundClip: 'border-box',
      border: '1px solid rgba(0, 0, 0, 0.175)',
      
      '> hr': {
        marginRight: '0',
        marginLeft: '0',
      },
    },
    
    '.ec-card .ec-card-body': {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      
      [`@screen lg`]: {
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
      },
    },
    
    '.ec-card-body': {
      flex: '1 1 auto',
      padding: '1.25rem',
    },

    // ==========================================
    // Form Controls (forms/_form-control.scss)
    // ==========================================
    '.ec-form-control': {
      display: 'block',
      width: '100%',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: theme('colors.gray-600') || '#495057',
      appearance: 'none',
      backgroundColor: theme('colors.white') || '#FFF',
      backgroundClip: 'padding-box',
      border: '1px solid #dee2e6',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',

      '&[type="file"]': {
        overflow: 'hidden',
        
        '&:not(:disabled):not([readonly])': {
          cursor: 'pointer',
        },
      },

      '&:focus': {
        color: theme('colors.gray-800') || '#212529',
        backgroundColor: theme('colors.white') || '#FFF',
        borderColor: '#86b7fe',
        outline: '0',
        boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)',
      },

      '&::-webkit-date-and-time-value': {
        minWidth: '85px',
        height: '1.5em',
        margin: '0',
      },

      '&::-webkit-datetime-edit': {
        display: 'block',
        padding: '0',
      },

      '&::placeholder': {
        color: theme('colors.gray-600') || '#495057',
        opacity: '1',
      },

      '&:disabled': {
        backgroundColor: theme('colors.gray-400') || '#999999',
        opacity: '1',
      },
    },

    'textarea.ec-form-control': {
      minHeight: 'calc(1.5em + 0.75rem + 2px)',
    },

    // ==========================================
    // List Group Components (_list-group.scss)
    // ==========================================
    '.ec-list-group': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '0',
      marginBottom: '0',
    },

    '.ec-list-group-item': {
      position: 'relative',
      display: 'block',
      padding: '0.5rem 1rem',
      color: theme('colors.gray-800') || '#212529',
      textDecoration: 'none',
      backgroundColor: theme('colors.white') || 'white',
      border: '1px solid #dee2e6',

      '&.disabled, &:disabled': {
        color: 'rgba(33, 37, 41, 0.75)',
        pointerEvents: 'none',
        backgroundColor: theme('colors.black') || '#000',
      },

      '&.active': {
        zIndex: '2',
        color: theme('colors.white') || 'white',
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',
      },

      '& + .ec-list-group-item': {
        borderTopWidth: '0',

        '&.active': {
          marginTop: '-1px',
          borderTopWidth: '1px',
        },
      },
    },

    // ==========================================
    // Form Labels (forms/_labels.scss)
    // ==========================================
    '.ec-col-form-label': {
      paddingTop: 'calc(0.375rem + 1px)',
      paddingBottom: 'calc(0.375rem + 1px)',
      marginBottom: '0',
      fontSize: 'inherit',
      lineHeight: '1.5',
    },

    // ==========================================
    // Form Check/Radio (forms/_form-check.scss)
    // ==========================================
    '.ec-form-check': {
      display: 'block',
      minHeight: '1.5rem',
      paddingLeft: '1.5em',
      marginBottom: '0.125rem',

      '.ec-form-check-input': {
        float: 'left',
        marginLeft: '-1.5em',
      },
    },

    '.ec-form-check-input': {
      flexShrink: '0',
      width: '1em',
      height: '1em',
      marginTop: '0.25em',
      verticalAlign: 'top',
      appearance: 'none',
      backgroundColor: theme('colors.white') || '#FFF',
      backgroundImage: 'var(--ec-form-check-bg-image)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      border: '1px solid #dee2e6',
      printColorAdjust: 'exact',

      '&[type="checkbox"]': {
        borderRadius: '0.25em',
      },

      '&[type="radio"]': {
        borderRadius: '50%',
      },

      '&:active': {
        filter: 'brightness(90%)',
      },

      '&:focus': {
        borderColor: '#86b7fe',
        outline: '0',
        boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)',
      },

      '&:checked': {
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',

        '&[type="checkbox"]': {
          '--ec-form-check-bg-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")`,
        },

        '&[type="radio"]': {
          '--ec-form-check-bg-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")`,
        },
      },

      '&[type="checkbox"]:indeterminate': {
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',
        '--ec-form-check-bg-image': `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/></svg>")`,
      },

      '&:disabled': {
        pointerEvents: 'none',
        filter: 'none',
        opacity: '0.5',
      },

      '&[disabled], &:disabled': {
        '~ .ec-form-check-label': {
          cursor: 'default',
          opacity: '0.5',
        },
      },
    },

    '.ec-form-check-inline': {
      display: 'inline-block',
    },

    // ==========================================
    // Input Group Components (forms/_input-group.scss)
    // ==========================================
    '.ec-input-group': {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      width: '100%',

      '> .ec-form-control, > .ec-form-select, > .ec-form-floating': {
        position: 'relative',
        flex: '1 1 auto',
        width: '1%',
        minWidth: '0',
      },

      '> .ec-form-control:focus, > .ec-form-select:focus, > .ec-form-floating:focus-within': {
        zIndex: '5',
      },

      '.ec-btn, .btn': {
        position: 'relative',
        zIndex: '2',

        '&:focus': {
          zIndex: '5',
        },
      },

      // Border radius handling
      '&:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating)': {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      },

      '> :not(:first-child):not(.dropdown-menu)': {
        marginLeft: '-1px',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      },
    },

    // ==========================================
    // Modal Components (_modal.scss)
    // ==========================================
    '.ec-modal': {
      // CSS Variables
      '--ec-modal-margin': '0.5rem',
      '--ec-modal-width': '500px',
      '--ec-modal-padding': '1rem',
      '--ec-modal-header-padding-x': '1rem',
      '--ec-modal-header-padding-y': '1rem',
      '--ec-modal-footer-gap': '0.5rem',

      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1055',
      display: 'none',
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '0 !important',
      outline: '0',
    },

    '.ec-modal-dialog': {
      position: 'relative',
      width: 'auto',
      margin: 'var(--ec-modal-margin)',
      pointerEvents: 'none',
    },

    '.ec-modal-content': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      color: theme('colors.gray-800') || '#212529',
      pointerEvents: 'auto',
      backgroundColor: theme('colors.white') || '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid rgba(0, 0, 0, 0.175)',
      borderRadius: '0.375rem',
      outline: '0',
    },

    '.ec-modal-header': {
      display: 'flex',
      flexShrink: '0',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--ec-modal-header-padding-y) var(--ec-modal-header-padding-x)',
      borderBottom: '1px solid #dee2e6',
      borderTopLeftRadius: '0.375rem',
      borderTopRightRadius: '0.375rem',
    },

    '.ec-modal-body': {
      position: 'relative',
      flex: '1 1 auto',
      padding: 'var(--ec-modal-padding)',
    },

    '.ec-modal-footer': {
      display: 'flex',
      flexShrink: '0',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 'calc(var(--ec-modal-padding) - var(--ec-modal-footer-gap) * 0.5)',
      gap: 'var(--ec-modal-footer-gap)',
      borderTop: '1px solid #dee2e6',
      borderBottomRightRadius: '0.375rem',
      borderBottomLeftRadius: '0.375rem',
    },

    // Modal sizes
    '.ec-modal-sm .ec-modal-dialog': {
      '--ec-modal-width': '300px',
    },

    '.ec-modal-lg .ec-modal-dialog': {
      '--ec-modal-width': '800px',
    },

    '.ec-modal-xl .ec-modal-dialog': {
      '--ec-modal-width': '1140px',
    },

    // Responsive modal
    [`@screen sm`]: {
      '.ec-modal-dialog': {
        maxWidth: 'var(--ec-modal-width)',
        margin: '1.75rem auto',
      },
    },

    // ==========================================
    // Form Text (forms/_form-text.scss)
    // ==========================================
    '.ec-form-text': {
      marginTop: '0.25rem',
      fontSize: '0.875em',
      color: theme('colors.gray-600') || '#6c757d',
    },
  }

  addComponents(components)
});