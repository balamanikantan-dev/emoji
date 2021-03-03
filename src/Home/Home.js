import { Card, Col, notification, Row } from 'antd'
import React, { useMemo, useState } from 'react'
import './Home.css'
import Data from "../Json/Data.json"

const Home = () => {
    // const [emojis, setEmojis] = useState(Data)
    const [query, setQuery] = useState('')

    const emojis = useMemo(() => {
        if (query === '') {
            return (Data)

        } else {
            console.time('a')
            const results = Data.filter(emoji => {
                return emoji.keywords.search(query) !== -1 || emoji.title.search(query) !== -1
            })
            console.timeEnd('a')
            return (results)
        }
    }, [query])
    const changeHandler = (event) => {
        console.log(event.target.value)
        setQuery(event.target.value)
    }
    const clickHandler = (text) => {
        navigator.clipboard.writeText(text).then(function () {
            console.log('Async: Copying to clipboard was successful!');
            notification.open({
                message: 'Copying to clipboard was successful!',
            });
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Emoji Search
            </h1>
            <h3 style={{ textAlign: "center" }}>A simple emoji search tool made with ReactJS.</h3>
            <label htmlFor="fname"></label>
            <input className="text" onChange={changeHandler} type="text" id="fname" name="firstname" placeholder="Search for a keyword.."></input>
            <div className="site-card-border-less-wrapper">
                <Row>
                    {emojis.map((emoji) => {
                        return <Col key={emoji.title} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card onClick={() => clickHandler(emoji.symbol)} title={emoji.title} bordered={false} style={{ width: 300, fontSize: "50px", textAlign: 'center', marginLeft: "80px" }}>
                                <p>{emoji.symbol}</p><br></br>
                            </Card>
                        </Col>
                    })}
                </Row>
            </div>,
        </div>
    )
}
export default Home