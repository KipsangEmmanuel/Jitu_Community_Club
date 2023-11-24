import {v4} from 'uuid'

jest.mock('uuid', () => ({
    v4: jest.fn()
}))

describe("This mocks the uuid", () => {

    it('generates a unique id', () => {

        const mockedV4 = jest.requireMock('uuid').v4
        mockedV4.mockImplementation(()=> 'unique_id873uhyfj')

        // console.log(v4())
    })
})