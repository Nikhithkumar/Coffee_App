import React from 'react'
import App from './App'

import renderer from 'react-test-renderer'

it('renderer without crashing',()=>{
    const rendered =renderer.create(<App/>).toJSON()
    expect(rendered).toBeTruthy()
})