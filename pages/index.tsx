import type { NextPage } from 'next'
import { Button, Card, Divider, FormControl, FormLabel, Link, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getCars, getMakers, getPrice, makers } from '../db'
import { css } from "@emotion/react"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../constants'
import { scrollToTarget } from '../helpers/scroll'
import { CarLoader } from '../components/CarLoader'
import { trackCarSearch } from '../helpers/gtag'

const Home: NextPage = () => {
  const [maker, setMaker] = useState("")
  const [makers, setMakers] = useState<makers>([])
  const [car, setCar] = useState<{name: string|null, frontSet: number|null, rearSet: number|null} | undefined>({name: null, frontSet: null, rearSet: null})
  const [showResult, setShowResult] = useState(false)
  const cars = useMemo(() => getCars(makers, maker), [makers, maker])
  const [loading, setLoading] = useState(false)
  const lastTrackedSearchKeyRef = useRef<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("https://script.google.com/macros/s/AKfycbyhqRNk0QNNUHkrtbsKT-DP_MnJOzDVwZrXBjhGuRw4jvkXLEGw6lWGt5IvUdoBQ2zCLA/exec")
      .then((res) => res.json())
      .then((makers) => {
          setMakers(makers)
          setLoading(false)
      })
  }, [])

  useEffect(() => {
    scrollToTarget("result")
  }, [showResult])

  return (
    <div css={css({
      display: "grid",
      gridTemplateRows: `auto minmax(calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT}), auto) auto`,
      '@media (max-width: 768px)': {
        gridTemplateRows: "auto 1fr auto"
      }
    })}>
      <header css={css({
        minHeight: HEADER_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        position: "relative",
        '@media (max-width: 768px)': {
          padding: "15px 20px",
          gap: 10,
        }
      })}>
        <div css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          position: "relative",
        })}>
          <img src="/logo-carfilm.webp" alt='logo' width={66} height={10} css={css({marginRight: 18, '@media (max-width: 768px)': {marginRight: 0}})} />
          <img src="/logo-funny.webp" alt='logo' width={168} height={40} css={css({'@media (max-width: 480px)': {width: 140, height: 33}})} />
        </div>
        <div css={css({
          marginLeft: "auto",
          display: "flex",
          gap: 20,
          '@media (max-width: 768px)': {
            marginLeft: "auto",
            gap: 15,
          },
          '@media (max-width: 480px)': {
            marginLeft: "auto",
            gap: 10
          }
        })}>
          <Link
            href="https://www.funny-okinawa.com"
            underline="none"
            color="#000"
            sx={{
              fontSize: {xs: 12, sm: 14, md: 16},
              fontWeight: 600,
              padding: {xs: '6px 12px', sm: '8px 16px'},
              borderRadius: '20px',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              background: '#EAC645',
              color: '#000',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            ホームページ
          </Link>
          <Link
            href="https://www.instagram.com/funny.okinawa"
            underline="none"
            color="#000"
            sx={{
              fontSize: {xs: 12, sm: 14, md: 16},
              fontWeight: 600,
              padding: {xs: '6px 12px', sm: '8px 16px'},
              borderRadius: '20px',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              background: '#EAC645',
              color: '#000',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            Instagram
          </Link>
        </div>
      </header>
      <div css={css({background: "#fff7db", padding: "40px 20px", display: "grid", justifyContent: "center", height: "100%"})}>
      {loading ? <CarLoader /> : (
        <Card css={styles.formCard}>
          <FormControl css={styles.formContainer}>
            <Typography variant="h2" component="h2" gutterBottom sx={{fontSize: {xs: 22, sm: 36}, textAlign: 'center', marginBottom: {xs: 2, sm: 4}}}>車種情報を入力してください</Typography>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontWeight: 700, color: '#000', marginBottom: 1}}>メーカー</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maker}
                label="メーカー"
                onChange={(event) => {
                  setMaker(event.target.value)
                  setCar({ name: null, frontSet: null, rearSet: null })
                  setShowResult(false)
                  lastTrackedSearchKeyRef.current = null
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ddd',
                    borderWidth: 2
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EAC645'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EAC645'
                  }
                }}
              >
                {makers?.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontWeight: 700, color: '#000', marginBottom: 1}}>車種</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={car?.name}
                label="maker"
                onChange={(event) => {
                  const car = getPrice(makers, maker, event.target.value)
                  setCar(car)
                }}
                disabled={!maker && !cars}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ddd',
                    borderWidth: 2
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EAC645'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EAC645'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'not-allowed',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    }
                  }
                }}
              >
                {cars && cars.map(({ name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => {
                if (!car?.name || !maker) return

                const searchKey = `${maker}|||${car.name}`
                if (lastTrackedSearchKeyRef.current !== searchKey) {
                  trackCarSearch({ maker, carName: car.name })
                  lastTrackedSearchKeyRef.current = searchKey
                }

                setShowResult(true)
                scrollToTarget('result')
              }}
              disabled={!car?.name || !maker}
              sx={{
                padding: '16px 32px',
                fontSize: {xs: 16, sm: 18},
                fontWeight: 900,
                backgroundColor: '#EAC645',
                color: '#000',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(234, 198, 69, 0.3)',
                '&:hover': {
                  backgroundColor: '#D4B33F',
                  boxShadow: '0 6px 16px rgba(234, 198, 69, 0.4)'
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                  color: '#666'
                }
              }}
            >
              料金を調べる
            </Button>
          </FormControl>
        </Card>
      )}
        <div id="result">
          {showResult && (
            <>
              <Divider css={css({margin: "40px 0", opacity: 0})} />
              <Card css={styles.resultCard}>
                <div css={styles.resultContainer}>
                  <Typography variant="h2" component="h2" gutterBottom sx={{fontSize: {xs: 22, sm: 36}, textAlign: 'center', marginBottom: 3}}>お見積り内容</Typography>
                  <Typography variant="h3" component="p" gutterBottom css={css({marginTop: 20, wordBreak: "keep-all", textAlign: 'center'})}>車種 : {car?.name}</Typography>
                  {car && <PriceTable car={car} />}
                  <div css={css({marginTop: 30, padding: '20px', background: '#FFFEF7', borderRadius: '8px'})}>
                    <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※代車も無料で貸し出しております。</Typography>
                    <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※リアのみ、ドアのみなどの価格はお問い合わせください。</Typography>
                    <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※古いフィルムの剥がし作業がある場合は、別途料金がかかります。</Typography>
                    <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※料金は年式やグレード等により若干前後する場合がございます。</Typography>
                    <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>詳細については、お電話にてお問い合わせください。</Typography>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
        </div>
        <footer css={css({
          minHeight: FOOTER_HEIGHT,
          background: "linear-gradient(135deg, #1a1a1a 0%, #000 100%)",
          padding: "30px 40px",
          color: "#fff",
          borderTop: "3px solid #EAC645",
          position: "relative",
          '@media (max-width: 768px)': {
            padding: "25px 20px"
          },
          '@media (max-width: 480px)': {
            padding: "20px 15px"
          },
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, #EAC645, transparent)",
            opacity: 0.5
          }
        })}>
          <div css={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            maxWidth: 1200,
            margin: "0 auto",
            '@media (max-width: 768px)': {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 25
            }
          })}>
            <div css={css({
              display: "flex",
              flexDirection: "column",
              gap: 8,
              '@media (max-width: 768px)': {
                width: "100%",
                alignItems: "center"
              }
            })}>
              <div css={css({
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingBottom: 10,
                '@media (max-width: 768px)': {
                  alignItems: "center"
                }
              })}>
                <img src="/logo-carfilm.webp" alt='logo' width={66} height={10} css={css({
                  marginRight: 18,
                  filter: 'brightness(0) invert(1)',
                  '@media (max-width: 768px)': {
                    marginRight: 0
                  }
                })} />
                <img src="/logo-funny.webp" alt='logo' width={168} height={40} css={css({
                  filter: 'brightness(0) invert(1)',
                  '@media (max-width: 480px)': {
                    width: 140,
                    height: 33
                  }
                })} />
              </div>
              <Typography variant="body2" component="p" sx={{
                color: '#ccc',
                fontSize: {xs: 12, sm: 14},
                '@media (max-width: 768px)': {
                  textAlign: "center"
                }
              }}>1994年創業 30年の実績</Typography>
            </div>

            <div css={css({
              display: "flex",
              flexDirection: "column",
              gap: 12,
              '@media (min-width: 769px)': {
                alignItems: 'flex-end'
              },
              '@media (max-width: 768px)': {
                width: "100%"
              }
            })}>
              <div css={css({
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                '@media (max-width: 768px)': {
                  width: "100%",
                  justifyContent: "center"
                },
                '@media (max-width: 480px)': {
                  padding: "8px 12px",
                  gap: 6
                }
              })}>
                <Typography variant="body2" component="p" sx={{color: '#EAC645', fontWeight: 700, fontSize: {xs: 12, sm: 14}}}>📍</Typography>
                <Typography variant="body2" component="p" sx={{
                  color: '#fff',
                  fontSize: {xs: 12, sm: 14}
                }}>沖縄県 沖縄市 松本 5-13-63</Typography>
              </div>
              <Link
                href="tel:09019453965"
                color="#EAC645"
                variant="body1"
                sx={{
                  fontWeight: 900,
                  textDecoration: 'none',
                  padding: {xs: '10px 16px', sm: '10px 20px'},
                  background: 'rgba(234, 198, 69, 0.15)',
                  borderRadius: '8px',
                  border: '2px solid #EAC645',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  fontSize: {xs: 14, sm: 16},
                  '@media (max-width: 768px)': {
                    width: "100%"
                  },
                  '&:hover': {
                    background: '#EAC645',
                    color: '#000',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(234, 198, 69, 0.4)'
                  }
                }}
              >
                ☎ 090-1945-3965
              </Link>
            </div>
          </div>

          <div css={css({
            textAlign: "center",
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            background: "transparent"
          })}>
            <Typography variant="caption" sx={{
              color: '#888',
              fontSize: {xs: 10, sm: 12}
            }}>
              © 2024 Funny Carfilm. All rights reserved.
            </Typography>
          </div>
        </footer>
    </div>
  )
}

export default Home


const styles = {
  formCard: css({
    maxWidth: "600px",
    width: "100%",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    background: "#fff",
    '@media (max-width: 768px)': {
      padding: "30px 20px",
      borderRadius: "12px",
    },
    '@media (max-width: 480px)': {
      padding: "20px 15px",
      borderRadius: "8px",
    }
  }),
  formContainer: css({
    display: "flex",
    rowGap: "30px",
    '@media (max-width: 480px)': {
      rowGap: "20px",
    }
  }),
  resultCard: css({
    maxWidth: "600px",
    width: "100%",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    background: "#fff",
    borderTop: "4px solid #EAC645",
    '@media (max-width: 768px)': {
      padding: "30px 20px",
      borderRadius: "12px",
    },
    '@media (max-width: 480px)': {
      padding: "20px 15px",
      borderRadius: "8px",
    }
  }),
  resultContainer: css({
    rowGap: "30px",
  })
}


const PriceTable = ({car}: {car: {name: string|null, frontSet: number|null, rearSet: number|null}}) => {
  return (
    <TableContainer css={css({marginTop: 30, overflowX: 'auto'})}>
      <Table sx={{
        maxWidth: 500,
        margin: "0 auto",
        width: '100%',
        '@media (max-width: 480px)': {
          maxWidth: '100%'
        }
      }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{
              fontWeight: 900,
              fontSize: {xs: 14, sm: 16},
              color: '#000',
              padding: {xs: '12px 8px', sm: '16px'}
            }} />
            <TableCell align="right" sx={{
              fontWeight: 900,
              fontSize: {xs: 14, sm: 16},
              color: '#000',
              padding: {xs: '12px 8px', sm: '16px'}
            }}>料金</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key="frontSet" sx={{
              '&:hover': {
                background: '#FFFEF7'
              }
            }}>
              <TableCell component="th" scope="row" variant="body" sx={{
                borderBottom: '2px solid #f0f0f0',
                padding: {xs: '12px 8px', sm: '16px'}
              }}>
                <Typography variant="body1" gutterBottom sx={{
                  fontWeight: 700,
                  fontSize: {xs: 14, sm: 16},
                  marginBottom: 0
                }}>フロントセット（前方3面）</Typography>
              </TableCell>
              <TableCell align="right" sx={{
                borderBottom: '2px solid #f0f0f0',
                padding: {xs: '12px 8px', sm: '16px'}
              }}>
                <Typography variant="h4" gutterBottom sx={{
                  color: '#EAC645',
                  fontWeight: 900,
                  fontSize: {xs: 18, sm: 22},
                  marginBottom: 0
                }}>{car.frontSet?.toLocaleString()}円</Typography>
              </TableCell>
            </TableRow>
            <TableRow key="rearSet" sx={{
              '&:hover': {
                background: '#FFFEF7'
              }
            }}>
              <TableCell component="th" scope="row" sx={{
                borderBottom: '2px solid #f0f0f0',
                padding: {xs: '12px 8px', sm: '16px'}
              }}>
                <Typography variant="body1" gutterBottom sx={{
                  fontWeight: 700,
                  fontSize: {xs: 14, sm: 16},
                  marginBottom: 0
                }}>リアセット（後方3面 または 5面）</Typography>
              </TableCell>
              <TableCell align="right" sx={{
                borderBottom: '2px solid #f0f0f0',
                padding: {xs: '12px 8px', sm: '16px'}
              }}>
              <Typography variant="h4" gutterBottom sx={{
                color: '#EAC645',
                fontWeight: 900,
                fontSize: {xs: 18, sm: 22},
                marginBottom: 0
              }}>{car.rearSet?.toLocaleString()}円</Typography>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <div css={css({textAlign: 'center', marginTop: 30, display: 'flex', flexDirection: 'column', gap: 15, alignItems: 'center'})}>
        <Link
          href="tel:09019453965"
          variant="h4"
          gutterBottom
          color="#000"
          sx={{
            display: 'inline-block',
            padding: {xs: '12px 24px', sm: '16px 32px'},
            background: '#EAC645',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 900,
            fontSize: {xs: 16, sm: 20},
            boxShadow: '0 4px 12px rgba(234, 198, 69, 0.3)',
            transition: 'all 0.3s',
            '&:hover': {
              background: '#D4B33F',
              boxShadow: '0 6px 16px rgba(234, 198, 69, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          ☎090-1945-3965<br />
          <span style={{fontSize: '12px', fontWeight: 700}}>ご予約・お問い合わせはこちら</span>
        </Link>
        <span>または</span>
        <Link
          href="https://lin.ee/imwwrYR"
          target="_blank"
          rel="noopener noreferrer"
          variant="h4"
          gutterBottom
          color="#fff"
          sx={{
            display: 'inline-block',
            padding: {xs: '12px 24px', sm: '16px 32px'},
            background: '#06c755',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 900,
            fontSize: {xs: 16, sm: 20},
            boxShadow: '0 2px 4px rgba(6, 199, 85, 0.3)',
            transition: 'all 0.3s',
            '&:hover': {
              background: '#05b04b',
              boxShadow: '0 6px 16px rgba(6, 199, 85, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          LINE公式アカウント<br />
          <span style={{fontSize: '12px', fontWeight: 700}}>LINEでもお問い合わせいただけます</span>
        </Link>
      </div>
    </TableContainer>
  )
}