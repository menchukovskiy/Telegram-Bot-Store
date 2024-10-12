import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles"

//color design token
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {

            primary: {
                100: "#d2d2d3",
                200: "#a5a5a7",
                300: "#78797a",
                400: "#4b4c4e",
                500: "#1e1f22",
                600: "#18191b",
                700: "#121314",
                800: "#0c0c0e",
                900: "#060607"
            },

            white: {
                100: "#fff"
            },

            grey: {
                100: "#dfe0e2",
                200: "#bfc0c4",
                300: "#a0a1a7",
                400: "#808189",
                500: "#60626c",
                600: "#4d4e56",
                700: "#3a3b41",
                800: "#26272b",
                900: "#131416"
            },

            black: {
                100: "#cececf",
                200: "#9e9e9f",
                300: "#6d6d6e",
                400: "#3d3d3e",
                500: "#0c0c0e",
                600: "#0a0a0b",
                700: "#070708",
                800: "#050506",
                900: "#151618"
            },
            green: {
                100: "#d5fbf4",
                200: "#aaf7e9",
                300: "#80f3de",
                400: "#55efd3",
                500: "#2bebc8",
                600: "#22bca0",
                700: "#1a8d78",
                800: "#115e50",
                900: "#092f28"
            },
            red: {
                100: "#fcdada",
                200: "#fab5b5",
                300: "#f79090",
                400: "#f56b6b",
                500: "#f24646",
                600: "#c23838",
                700: "#912a2a",
                800: "#611c1c",
                900: "#300e0e"
            },
            blue: {
                100: "#daecfc",
                200: "#b5d9fa",
                300: "#90c5f7",
                400: "#6bb2f5",
                500: "#469ff2",
                600: "#387fc2",
                700: "#2a5f91",
                800: "#1c4061",
                900: "#0e2030"
            },
            indigo: {
                100: "#e1dafb",
                200: "#c2b5f8",
                300: "#a490f4",
                400: "#856bf1",
                500: "#6746ed",
                600: "#5238be",
                700: "#3e2a8e",
                800: "#291c5f",
                900: "#150e2f"
            }
        } : {
            primary: {
                900: "#d2d2d3",
                800: "#a5a5a7",
                700: "#78797a",
                600: "#4b4c4e",
                500: "#1e1f22",
                400: "#18191b",
                300: "#121314",
                200: "#0c0c0e",
                100: "#060607"
            },

            white: {
                100: "#222"
            },

            grey: {
                100: "#131416",
                200: "#26272b",
                300: "#3a3b41",
                400: "#9f9f9f",
                500: "#60626c",
                600: "#808189",
                700: "#a0a1a7",
                800: "#bfc0c4",
                900: "#dfe0e2",
            },
            black: {
                100: "#020203",
                200: "#050506",
                300: "#070708",
                400: "#0a0a0b",
                500: "#0c0c0e",
                600: "#3d3d3e",
                700: "#6d6d6e",
                800: "#9e9e9f",
                900: "#cececf",
            },
            green: {
                100: "#092f28",
                200: "#115e50",
                300: "#1a8d78",
                400: "#22bca0",
                500: "#2bebc8",
                600: "#55efd3",
                700: "#80f3de",
                800: "#aaf7e9",
                900: "#d5fbf4",
            },
            red: {
                900: "#300e0e",
                200: "#611c1c",
                300: "#912a2a",
                400: "#c23838",
                500: "#f24646",
                600: "#f56b6b",
                700: "#f79090",
                800: "#fab5b5",
                900: "#fcdada",
            },
            blue: {
                100: "#0e2030",
                200: "#1c4061",
                300: "#2a5f91",
                400: "#387fc2",
                500: "#469ff2",
                600: "#6bb2f5",
                700: "#90c5f7",
                800: "#b5d9fa",
                900: "#daecfc",
            },
            indigo: {
                100: "#150e2f",
                200: "#291c5f",
                300: "#3e2a8e",
                400: "#5238be",
                500: "#6746ed",
                600: "#856bf1",
                700: "#a490f4",
                800: "#c2b5f8",
                900: "#e1dafb",
            }
        }

    )
})

export const themeSettings = (mode) => {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.black[500]
                    },
                    secondary: {
                        main: colors.green[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100]
                    },
                    background: {
                       default: colors.primary[500]
                    }
                } : {
                    primary: {
                        main: colors.black[100]
                    },
                    secondary: {
                        main: colors.green[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100]
                    },
                    background: {
                       default: '#fcfcfc'
                    }
                }
            ),
        },
        components: {
            MuiDialog :{
                styleOverrides: {
                    root: {
                        '& .MuiDialogContent-root': {
                            background: `${colors.black[900]} !important`,
                        },

                        '& .MuiDialogActions-root' : {
                            background: `${colors.black[900]} !important`,
                        },

                        '& .MuiDialogTitle-root' : {
                            background: `${colors.black[900]} !important`,
                            fontSize: '20px !important',
                        },
                    
                        '& .MuiPaper-root' : {
                            minWidth: 400,
                            padding: 10,
                            background: `${colors.black[900]} !important`,
                        },
                        
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                  root: {
                    '--TextField-brandBorderColor': '#E0E3E7',
                    '--TextField-brandBorderHoverColor': '#B2BAC2',
                    '--TextField-brandBorderFocusedColor': '#6F7E8C',
                    '& label.Mui-focused': {
                      color: 'var(--TextField-brandBorderFocusedColor)',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline' : {
                        borderColor: 'var(--TextField-brandBorderFocusedColor) !important',
                        border: '1px solid var(--TextField-brandBorderFocusedColor) !important'
                    }
                  },
                },
              },
            
              MuiFilledInput: {
                styleOverrides: {
                  root: {
                    '&::before, &::after': {
                      borderBottom: '1px solid var(--TextField-brandBorderColor)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                      borderBottom: '1px solid var(--TextField-brandBorderHoverColor)',
                    },
                    '&.Mui-focused:after': {
                      borderBottom: '1px solid var(--TextField-brandBorderFocusedColor)',
                       borderColor: 'var(--TextField-brandBorderFocusedColor) !important'
                    }
                  },
                },
              },

              MuiFormControl: {
                styleOverrides: {
                    root: {
                    '& .MuiFormLabel-root': {
                        color: '#6F7E8C',
                    },

                    '& .Mui-focused .MuiOutlinedInput-notchedOutline' : {
                        borderColor: 'var(--TextField-brandBorderFocusedColor) !important'
                    },

                    '& .MuiInputLabel-root.Mui-focused' : {
                        color: '#6F7E8C',
                    },
                      '&::before, &::after': {
                        borderBottom: '1px solid var(--TextField-brandBorderColor)',
                      },
                      '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '1px solid var(--TextField-brandBorderHoverColor)',
                      },
                      '&.Mui-focused:after': {
                        borderBottom: '1px solid var(--TextField-brandBorderFocusedColor)',
                         borderColor: 'var(--TextField-brandBorderFocusedColor) !important'
                      }
                    },
                  },
              },

              MuiInput: {
                styleOverrides: {
                  root: {
                    '&::before': {
                      borderBottom: '1px solid var(--TextField-brandBorderColor)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                      borderBottom: '1px solid var(--TextField-brandBorderHoverColor)',
                    },
                    '&.Mui-focused:after': {
                      borderBottom: '1px solid var(--TextField-brandBorderFocusedColor)',
                       borderColor: 'var(--TextField-brandBorderFocusedColor) !important'
                    },
                  },
                },
            }
        },

        typography : {
            fontFamily: [ "Roboto", "sans-serif" ].join(","),
            fontSize: 12,
            h1: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: [ "Roboto", "sans-serif" ].join(","),
                fontSize: 14,
            }
        }
    }
}

//context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"))
      
      }
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};

