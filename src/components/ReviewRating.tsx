import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {RatingAndReviewsProps, Review} from '../types/reviews';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RatingAndReviews: React.FC<RatingAndReviewsProps> = ({reviews}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const iconName = i <= rating ? 'star' : 'star-outline';
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name={iconName}
          size={20}
          color="#FFD700"
        />,
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderReview = ({item}: {item: Review}) => (
    <View style={styles.review}>
      <Text style={styles.name}>{item.reviewerName}</Text>
      <Text style={styles.email}>{item.reviewerEmail}</Text>
      {renderStars(item.rating)}
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View>    
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item, index) => `${item.reviewerEmail}-${index}`} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  review: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
  },
  comment: {
    marginTop: 5,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12,
  },
});

export default RatingAndReviews;
