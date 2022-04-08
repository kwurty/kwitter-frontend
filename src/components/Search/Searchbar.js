import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { UserContext } from '../../contexts/UserContext'
import './Searchbar.css'
export default function Searchbar() {



    const user = React.useContext(UserContext)

    let [results, setResults] = useState([])
    let [searchField, setSearchField] = useState('')

    const doSearch = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.user.token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/posts?hashtag=${searchField}`, requestOptions)
        let status = await response.status
        if (status === 200) {
            let postsInfo = await response.json()
            setResults(postsInfo)
        } else {

        }
    }

    useEffect(() => {

    }, [])

    return (
        <div className='searchbar-container'>
            <form className="search-container">

                <DebounceInput
                    className=""
                    id='search-bar'
                    value={searchField}
                    placeholder={"Search Kwitter"}
                    debounceTimeout={300}
                    type="text"
                    onChange={(e) => {
                        doSearch(e.target.value)
                    }}
                />

            </form>
            {
                results.length > 0 && (
                    <div className="popdown">
                        {results.map(result => {
                            <div className="search-result-item">
                                {result}
                            </div>
                        })}
                    </div>

                )
            }

        </div>
    )
}
