  export const exerciseData = {
    'steps': [
      {
        id: '1',
        name: 'Eye - Rotate',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start',
          'Step 2: Rotate Eyes partial',
          'Step 3: Rotate Eyes in progress',
          'Step 4: Rotate Eyes complete',
        ]
      },
      {
        id: '2',
        name: 'Eye - Blinking',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start 2',
          'Step 2: Rotate Eyes partial 2',
          'Step 3: Rotate Eyes in progress 2',
          'Step 4: Rotate Eyes complete 2',
        ]
      },
      {
        id: '3',
        name: 'Eye - Palming',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start 3',
          'Step 2: Rotate Eyes partial 3',
          'Step 3: Rotate Eyes in progress 3',
          'Step 4: Rotate Eyes complete 3',
        ]
      },
      {
        id: '4',
        name: 'Eye - Blinking',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start 4',
          'Step 2: Rotate Eyes partial 4',
          'Step 3: Rotate Eyes in progress 4',
          'Step 4: Rotate Eyes complete 4',
        ]
      },
      {
        id: '5',
        name: 'Eye - Up & Down',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start 5',
          'Step 2: Rotate Eyes partial 5',
          'Step 3: Rotate Eyes in progress 5',
          'Step 4: Rotate Eyes complete 5',
        ]
      },
      {
        id: '6',
        name: 'Eye - Up & Down',
        videoUrl: '/videos/all/demo_1.mp4',
        steps: [
          'Step 1: Rotate Eyes start 5',
          'Step 2: Rotate Eyes partial 5',
          'Step 3: Rotate Eyes in progress 5',
          'Step 4: Rotate Eyes complete 5',
        ]
      }
    ]
    // Add more days and exercises as needed
  }
  
  export const getDays = () => { 
    return Array.from({length: 7}, (_, i) => `Day ${i + 1}`);
  }