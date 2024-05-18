import React from 'react';
import renderer from 'react-test-renderer';
import APOD from '../src/components/APOD';
// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      url: 'https://example.com/image.jpg',
      title: 'Test Title',
      date: '2024-05-18',
      explanation: 'Test explanation.',
    }),
  })
);

describe('APOD Component', () => {
  it('renders correctly and fetches data', async () => {
    const component = renderer.create(<APOD />);
    await Promise.resolve(); // Wait for useEffect to complete
    const tree = component.toJSON();
    console.log(tree); // Add this line before the failing expectations

    expect(tree).toMatchSnapshot(); // Check if the component renders without crashing
    expect(tree.children[0].children[1].props.src).toBe('https://example.com/image.jpg'); // Check if image URL is correct
    expect(tree.children[1].children[0].children[0].children[0]).toBe('Test Title'); // Check if title is correct
    expect(tree.children[1].children[0].children[0].children[1]).toBe('2024-05-18'); // Check if date is correct
    expect(tree.children[1].children[1].children[0]).toBe('Test explanation.'); // Check if explanation is correct
  });
});
