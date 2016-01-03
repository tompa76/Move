(function() { //js
  'use strict';

  angular.module('move.models')
    .factory('Base', baseFactory);

  function baseFactory() {

    function Base(resource) {
      this.resource = resource;
      this.items = {};
    }

    Base.prototype.getAll = getAll;
    Base.prototype.getById = getById;
    Base.prototype.save = save;
    Base.prototype.create = create;
    Base.prototype.updateItems = updateItems;
    Base.prototype.updateItem = updateItem;

    function getAll() {
      return this.resource.query().$promise.then(handleResponse.bind(this));

      function handleResponse(object) {
        object = _.indexBy(object, 'id');

        this.updateItems(this.items, object);

        return this.items;
      }
    }

    function getById(id) {
      return this.resource.get({id: id}).$promise.then(handleResponse.bind(this));

      function handleResponse(object) {
        var oldObject = this.items[id];
        if (oldObject) {
          angular.extend(oldObject, object);
        } else {
          this.items[id] = object;
        }
        return this.items[id];
      }
    }

    function save(item) {
      if (angular.isDefined(item.id)) {
        return item.$update().then(updateItem.bind(this));
      } else {
        return item.$save().then(updateItem.bind(this));
      }
    }

    function updateItem(item) {
      var oldItem = this.items[item.id];
      if (angular.isDefined(oldItem)) {
        angular.extend(oldItem, item);
      } else {
        this.items[item.id] = item;
      }
      return this.items[item.id];
    }

    function updateItems(oldItems, newItems) {
      // TODO: Use angular.merge when 1.4 is available
      _.each(newItems, function(newItem, key) {
        var oldItem = oldItems[key];
        if (oldItem) {
          angular.extend(oldItem, newItem);
        } else {
          oldItems[key] = newItem;
        }
      });

      _.each(oldItems, function(oldItem, key) {
        if (angular.isUndefined(newItems[key])) {
          delete oldItems[key];
        }
      });
    }

    function create(initialObject) {
      return new this.resource(initialObject);
    }

    return Base;
  }
})();
