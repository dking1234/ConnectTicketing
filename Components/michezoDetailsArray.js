const michezoDetailsArray = [
    {
      type: 'View',
      style: styles.michezoDetails,
      children: [
        {
          type: 'View',
          style: styles.initialVectors,
          children: [
            {
              type: 'Text',
              style: { fontSize: 30, fontWeight: 'bold' },
              content: 'M',
            },
          ],
        },
        {
          type: 'View',
          children: [
            {
              type: 'Text',
              style: styles.amountText,
              content: 'Musa Kitwana',
            },
            {
              type: 'Text',
              style: styles.descriptionText,
              content: '+255 636 736 373',
            },
          ],
        },
        {
          type: 'TouchableOpacity',
          children: [
            {
              type: 'View',
              style: {
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: '#B9D2CA',
                borderRadius: 30,
                alignItems: 'center',
              },
              children: [
                {
                  type: 'Text',
                  content: 'Alika',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  
  export default michezoDetailsArray;
  