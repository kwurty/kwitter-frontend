import React from 'react';
import { UrlMatcher, HashtagMatcher } from 'interweave-autolink';

import { Interweave } from 'interweave'
import { Link } from 'react-router-dom';

const hashtagParser = function () {


    class MyUrlMatcher extends UrlMatcher {
        replaceWith(children) {
            return <a href={children.startsWith('http') ? children : 'https://' + children} rel='noopener noreferrer' target='_blank'>{children}</a>
        }
    }

    class MyHashtagMatcher extends HashtagMatcher {
        replaceWith(children, props) {
            return <Link to={`/search/${(children.slice(1, children.length)).toLowerCase()}`} {...props}>{children}</Link>
        }
    }

    return tweet => <Interweave content={tweet} matchers={[new MyUrlMatcher('url'), new MyHashtagMatcher('hashtag')]} />
}

export default hashtagParser;